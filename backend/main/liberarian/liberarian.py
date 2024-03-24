#!/usr/bin/python3
"""
This module contains the admin application that handles all routing relating to
the liberarian
"""
from .routers.account import account_router
from .routers.token import lib_login_router
from ..pydantic_models.tag import tags_metadata
from fastapi import FastAPI


liberarian = FastAPI(openapi_tags=tags_metadata)


liberarian.include_router(lib_login_router)
liberarian.include_router(account_router)
