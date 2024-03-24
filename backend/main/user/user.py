#!/usr/bin/python3
"""
This module contains the student application that handles all routing relating
to the student
"""
from main.openapi_meta import app_metadata
from .routers.account import user_account_router
from .routers.registration import registration_router
from .routers.token import user_login_router
from ..openapi_meta.tag import tags_metadata
from fastapi import FastAPI

user = FastAPI(title="College Library (User App)",
               contact=app_metadata.contact,
               openapi_tags=tags_metadata)


user.include_router(user_account_router)
user.include_router(registration_router)
user.include_router(user_login_router)
