#!/usr/bin/python3
"""
This module contains the student application that handles all routing relating
to the student
"""
from .routers.account import user_account_router
from .routers.registration import registration_router
from .routers.token import user_login_router
from fastapi import FastAPI

user = FastAPI()


user.include_router(user_account_router)
user.include_router(registration_router)
user.include_router(user_login_router)
