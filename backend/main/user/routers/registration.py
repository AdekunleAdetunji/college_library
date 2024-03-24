#!/usr/bin/python3
"""
This module contains the route that manage user sign-up and email verification
token
"""
import json
from ...cursor.cursor import Cursor
from ...cursor.redis_cursor import redis_cursor
from ...microservices.gen_code import gen_random_code
from ...microservices.send_mail import send_code
from ...pydantic_models.tag import Tags
from ...pydantic_models.user import UserModelIn
from ...schemas.staff import Staff
from ...schemas.student import Student
from ...schemas.user import User
from datetime import timedelta
from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from typing import Annotated
from redis import Redis


registration_router = APIRouter()


@registration_router.post("/get-signup-code", tags=[Tags.sign_up],
                          status_code=status.HTTP_201_CREATED)
async def get_code(uni_id: str,
                      password: str,
                      red_cursor: Annotated[Redis, Depends(redis_cursor)],
                      is_staff: bool = False,
                      lib_cursor: Cursor = Depends(Cursor()),
                      uni_cursor: Cursor = Depends(Cursor("university")),
                      unique_code: str = Depends(gen_random_code)):
    """route to handle new user signup by sending verification code to email"""
    user = lib_cursor.get(User, uni_id)
    if user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="user already exists")

    if is_staff:
        user = uni_cursor.get(Staff, uni_id)
    else:
        user = uni_cursor.get(Student, uni_id)

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="personel not in university database")

    user_in_redis = red_cursor.get(uni_id)
    if user_in_redis:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="duplicate session")

    user_email = user.email
    user_dict = user.__dict__.copy()
    user_dict.pop("_sa_instance_state")
    await send_code(user_email, unique_code)
    user_dict.update({"code": unique_code, "password": password})
    user_json = json.dumps(user_dict)
    code_expire_time = timedelta(minutes=10)
    red_cursor.setex(uni_id, code_expire_time, user_json)

    return {}


@registration_router.post("/sign-up", tags=[Tags.sign_up],
                          status_code=status.HTTP_202_ACCEPTED)
async def sign_up(uni_id: str, email_code: str,
                        redis_cursor: Annotated[Redis, Depends(redis_cursor)],
                        is_staff: bool = False,
                        lib_cursor: Cursor = Depends(Cursor())):
    """route to handle confirmation of email sent to email"""
    reg_user = lib_cursor.get(User, uni_id)
    if reg_user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="user already exists")

    user = redis_cursor.get(uni_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="invalid user")

    user_json = user.decode()
    user_dict = json.loads(user_json)
    if user_dict.get("code") != email_code:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="invalid code")

    user_py_obj = UserModelIn(**user_dict)
    if is_staff:
        user_py_obj.is_staff = True
    else:
        user_py_obj.is_staff = False

    lib_cursor.new(User, **user_py_obj.model_dump())

    redis_cursor.flushdb("uni_id")

    return {}
