#!/usr/bin/python3
"""
This module contains routers that manage a user profile
"""
import json
from ...authentication.verify_token import oauth2_scheme
from ...authentication.verify_token import verify_token
from ...cursor.cursor import Cursor
from ...cursor.redis_cursor import redis_cursor
from ...microservices.gen_code import gen_random_code
from ...microservices.send_mail import send_code
from ...openapi_meta.tag import Tags
from ...pydantic_models.user import UserModelOut
from ...schemas.user import User
from datetime import timedelta
from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from redis import Redis
from typing import Annotated


user_account_router = APIRouter()


@user_account_router.get("/", response_model=UserModelOut,
                         status_code=status.HTTP_200_OK,
                         tags=[Tags.get_ind_info])
async def get_user(token: Annotated[str, Depends(oauth2_scheme)],
                   uni_id: str, lib_cursor: Cursor = Depends(Cursor())):
    """route to retrieve a user info on sign in"""
    token_dict = verify_token(token)
    if token_dict["sub"] != uni_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="access denied")
    user = lib_cursor.get(User, uni_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="user not found")

    return user


@user_account_router.post("/get-reset-code",
                          status_code=status.HTTP_201_CREATED,
                          tags=[Tags.reset_pass])
async def get_reset_code(uni_id: str, new_password: str,
                                   unique_code: str = Depends(gen_random_code),
                                   lib_cursor: Cursor = Depends(Cursor()),
                                   red_cursor: Redis = Depends(redis_cursor)):
    """route to send password reset code to user email"""
    user = lib_cursor.get(User, uni_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="user not found")

    user_dict = user.to_dict()
    id = str(user_dict["id"])

    user_in_redis = red_cursor.get(id)
    if user_in_redis:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="duplicate session")

    user_dict.pop("password")
    user_dict["id"] = id
    await send_code(user_dict["email"], unique_code)
    user_dict.update({"code": unique_code, "password": new_password})
    code_expire = timedelta(minutes=9)
    liberarian_json = json.dumps(user_dict)
    red_cursor.setex(user_dict["id"], code_expire, liberarian_json)

    return {}


@user_account_router.put("/reset-password",
                         status_code=status.HTTP_202_ACCEPTED,
                         tags=[Tags.reset_pass])
async def reset_password(uni_id: str, email_code: str,

                         lib_cursor: Cursor = Depends(Cursor()),
                         red_cursor: Redis = Depends(redis_cursor)):
    """route to reset user password"""
    liberarian = lib_cursor.get(User, uni_id)
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
