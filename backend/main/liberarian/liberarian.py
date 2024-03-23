#!/usr/bin/python3
"""
This module contains the admin application that handles all routing relating to
the liberarian
"""
from .routers.account import account_router
from .routers.token import lib_login_router
from fastapi import FastAPI


liberarian = FastAPI()


liberarian.include_router(lib_login_router)
liberarian.include_router(account_router)
