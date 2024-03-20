#!/usr/bin/python3
"""
This module contains the api router to manage admin login
"""
from ...authentication.auth_var import access_token_expires_admin
from ...authentication.create_token import create_access_token
from ...authentication.verify_info import verify_info
from ...pydantic_models.token import Token
from fastapi import APIRouter
from fastapi import Depends
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated

admin_login = APIRouter()


@admin_login.post("/token", response_model=Token, include_in_schema=False)
async def login_for_token(login_info: Annotated[OAuth2PasswordRequestForm,
                                                Depends()]):
    """route to handle JWT generation on admin login"""
    username = login_info.username
    password = login_info.password
    verify_info(username, password, is_admin=True)
    access_token = create_access_token(data={"sub": username},
                                       expires_delta=access_token_expires_admin
                                       )
    return Token(access_token=access_token, token_type="bearer")
