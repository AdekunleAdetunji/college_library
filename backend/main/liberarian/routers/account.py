#!/usr/bin/python3
"""
This module contains routes to handle actions on liberarian profile
"""
import json
from ...authentication.verify_token import oauth2_scheme
from ...authentication.verify_token import verify_token
from ...cursor.cursor import Cursor
from ...cursor.redis_cursor import redis_cursor
from ...microservices.send_mail import send_code
from ...microservices.gen_code import gen_random_code
from ...pydantic_models.liberarian import LiberarianModelOut
from ...pydantic_models.tag import Tags
from ...schemas.liberarian import Liberarian
from datetime import timedelta
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
async def get_reset_code(uni_id: str, new_password: str,
                                   unique_code: str = Depends(gen_random_code),
                                   lib_cursor: Cursor = Depends(Cursor()),
                                   red_cursor: Redis = Depends(redis_cursor)):
    """route to send password reset code to liberarian email"""
    liberarian = lib_cursor.get(Liberarian, uni_id)
    if not liberarian:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="liberarian not found")

    liberarian_dict = liberarian.to_dict()
    id = str(liberarian_dict["id"])

    lib_in_redis = red_cursor.get(id)
    if lib_in_redis:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="duplicate session")

    liberarian_dict.pop("password")
    liberarian_dict["id"] = id
    await send_code(liberarian_dict["email"], unique_code)
    liberarian_dict.update({"code": unique_code, "password": new_password})
    code_expire = timedelta(minutes=9)
    liberarian_json = json.dumps(liberarian_dict)
    red_cursor.setex(liberarian_dict["id"], code_expire, liberarian_json)

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

    key = str(liberarian.id)
    liberarian_json = red_cursor.get(key)
    if not liberarian_json:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="user not found")

    liberarian_dict = json.loads(liberarian_json)
    if email_code != liberarian_dict["code"]:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="code invalid")

    liberarian.password = liberarian_dict["password"]
    lib_cursor.save()

    red_cursor.flushdb(key)

    return {}
