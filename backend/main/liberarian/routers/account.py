#!/usr/bin/python3
"""
This module contains routes to handle actions on liberarian profile
"""
import json
from ...authentication.verify_token import oauth2_scheme
from ...authentication.verify_token import verify_token
from ...cursor.cursor import Cursor
from ...cursor.redis_cursor import redis_cursor
from ...microservices.celery.tasks import send_code
from ...pydantic_models.liberarian import LiberarianModelOut
from ...pydantic_models.liberarian import LibRegModel
from ...openapi_meta.tag import Tags
from ...schemas.liberarian import Liberarian
from fastapi import Depends
from fastapi import APIRouter
from fastapi import HTTPException
from fastapi import status
from redis import Redis
from typing import Annotated


account_router = APIRouter()


@account_router.get("/", status_code=status.HTTP_200_OK,
                    tags=[Tags.get_ind_info],
                    response_model=LiberarianModelOut)
def get_lib_info(uni_id: str, token: Annotated[str, Depends(oauth2_scheme)],
                 lib_cursor: Cursor = Depends(Cursor())):
    """router to handle retrieval of liberarian info"""
    token_staff_no = verify_token(token=token)
    if token_staff_no["sub"] != uni_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="access denied")

    liberarian = lib_cursor.get(Liberarian, uni_id)
    if not liberarian:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="liberarian does not exist")
    return liberarian


@account_router.post("/get-reset-code",
                     status_code=status.HTTP_201_CREATED,
                     tags=[Tags.reset_pass])
async def get_reset_code(body: LibRegModel,
                         lib_cursor: Cursor = Depends(Cursor()),
                         red_cursor: Redis = Depends(redis_cursor)):
    """route to send password reset code to liberarian email"""
    liberarian = lib_cursor.get(Liberarian, body.uni_id)
    if not liberarian:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="liberarian not found")

    liberarian_dict = liberarian.to_dict()

    lib_in_redis = red_cursor.get(body.uni_id)
    if lib_in_redis:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="duplicate session")

    
    id = str(liberarian_dict["id"])
    liberarian_dict.pop("password")
    liberarian_dict.update({"password": body.new_password, "id": id})
    print(liberarian_dict)
    send_code.delay(liberarian_dict)
    return {}


@account_router.put("/reset-password", status_code=status.HTTP_202_ACCEPTED,
                    tags=[Tags.reset_pass])
async def reset_password(uni_id: str, email_code: str,
                         lib_cursor: Cursor = Depends(Cursor()),
                         red_cursor: Redis = Depends(redis_cursor)):
    """route to reset liberaian password"""
    liberarian = lib_cursor.get(Liberarian, uni_id)
    if not liberarian:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="liberarian not found")

    liberarian_json = red_cursor.get(uni_id)
    if not liberarian_json:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="user not found")

    liberarian_dict = json.loads(liberarian_json)
    if email_code != liberarian_dict["code"]:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="code invalid")

    liberarian.password = liberarian_dict["password"]
    lib_cursor.save()

    red_cursor.flushdb(uni_id)

    return {}
