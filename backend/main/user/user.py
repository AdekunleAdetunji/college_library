#!/usr/bin/python3
"""
This module contains the student application that handles all routing relating
to the student
"""
from main.openapi_meta import app_metadata
from .routers.account import user_account_router
from .routers.book.book import book_router
from .routers.book.borrow import borrow_router
from .routers.book.reserves import reserves_router
from .routers.faculty import faculty_router
from .routers.registration import registration_router
from .routers.token import user_login_router
from ..openapi_meta.tag import user_tags_metadata
from fastapi import FastAPI

user = FastAPI(title="College Library (User App)",
               contact=app_metadata.contact,
               openapi_tags=user_tags_metadata)


user.include_router(user_account_router)
user.include_router(book_router)
user.include_router(reserves_router)
user.include_router(borrow_router)
user.include_router(registration_router)
user.include_router(user_login_router)
user.include_router(faculty_router)
