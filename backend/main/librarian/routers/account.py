#!/usr/bin/python3
"""
This module contains routes to handle actions on librarian profile
"""
import json
from ...authentication.verify_token import oauth2_scheme
from ...authentication.verify_token import verify_token
from ...cursor.cursor import Cursor
from ...cursor.redis_cursor import redis_cursor
from ...microservices.celery.tasks import send_code
from ...pydantic_models.liberarian import LibrarianModelOut
from ...pydantic_models.liberarian import LibRegModel
from ...openapi_meta.tag import Tags
from ...schemas.liberarian import Librarian
from fastapi import Depends
from fastapi import APIRouter
from fastapi import HTTPException
from fastapi import status
from redis import Redis
from typing import Annotated


account_router = APIRouter()


@account_router.get("/", status_code=status.HTTP_200_OK,
                    tags=[Tags.get_ind_info],
                    response_model=LibrarianModelOut)
def get_lib_info(uni_id: str, token: Annotated[str, Depends(oauth2_scheme)],
                 lib_cursor: Cursor = Depends(Cursor())):
    """router to handle retrieval of librarian info"""
    token_staff_no = verify_token(token=token)
    if token_staff_no["sub"] != uni_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="access denied")

    librarian = lib_cursor.get(Librarian, uni_id)
    if not librarian:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="librarian does not exist")
    return librarian


@account_router.post("/get-reset-code",
                     status_code=status.HTTP_201_CREATED,
                     tags=[Tags.reset_pass])
async def get_reset_code(body: LibRegModel,
                         lib_cursor: Cursor = Depends(Cursor()),
                         red_cursor: Redis = Depends(redis_cursor)):
    """route to send password reset code to librarian email"""
    librarian = lib_cursor.get(Librarian, body.uni_id)
    if not librarian:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="librarian not found")

    librarian_dict = librarian.to_dict()

    lib_in_redis = red_cursor.get(body.uni_id)
    if lib_in_redis:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="duplicate session")

    
    id = str(librarian_dict["id"])
    librarian_dict.pop("password")
    librarian_dict.update({"password": body.new_password, "id": id})
    print(librarian_dict)
    send_code.delay(librarian_dict)
    return {}


@account_router.put("/reset-password", status_code=status.HTTP_202_ACCEPTED,
                    tags=[Tags.reset_pass])
async def reset_password(uni_id: str, email_code: str,
                         lib_cursor: Cursor = Depends(Cursor()),
                         red_cursor: Redis = Depends(redis_cursor)):
    """route to reset libraian password"""
    librarian = lib_cursor.get(Librarian, uni_id)
    if not librarian:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="librarian not found")

    librarian_json = red_cursor.get(uni_id)
    if not librarian_json:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="user not found")

    librarian_dict = json.loads(librarian_json)
    if email_code != librarian_dict["code"]:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="code invalid")

    librarian.password = librarian_dict["password"]
    lib_cursor.save()

    red_cursor.flushdb(uni_id)

    return {}
