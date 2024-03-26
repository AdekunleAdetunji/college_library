#!/usr/bin/python3
"""
This module contains the admin application that handles all routing relating to
the liberarian
"""
from main.openapi_meta import app_metadata
from .routers.account import account_router
from .routers.book import book_router
from .routers.token import lib_login_router
from ..openapi_meta.tag import liberarian_tags_metadata
from fastapi import FastAPI


#del tags_metadata[0]
liberarian = FastAPI(title="College Library (Librarian App)",
                     contact=app_metadata.contact,
                     openapi_tags=liberarian_tags_metadata)


liberarian.include_router(lib_login_router)
liberarian.include_router(account_router)
liberarian.include_router(book_router)