#!/usr/bin/python3
"""
This module handles generation of JWT generation on user signup
"""
from ...cursor.cursor import Cursor
from ...authentication.auth_var import access_token_expires_user
from ...authentication.create_token import create_access_token
from ...authentication.verify_info import verify_info
from ...pydantic_models.token import Token
from fastapi import APIRouter
from fastapi import Depends
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated


user_login_router = APIRouter()


@user_login_router.post("/token", include_in_schema=False,
                        response_model=Token)
async def login_for_token(login_info: Annotated[OAuth2PasswordRequestForm,
                                                Depends()],
                          lib_cursor: Cursor = Depends(Cursor())):
    """route to handle liberarian login"""
    username = login_info.username
    password = login_info.password
    verify_info(username, password, cursor=lib_cursor)
    access_token = create_access_token(data={"sub": username},
                                       expires_delta=access_token_expires_user)

    return Token(access_token=access_token, token_type="bearer")
