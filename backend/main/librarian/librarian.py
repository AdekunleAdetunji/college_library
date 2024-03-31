#!/usr/bin/python3
"""
This module contains the admin application that handles all routing relating to
the librarian
"""
from main.openapi_meta import app_metadata
from .routers.account import account_router
from .routers.book.book import book_router
from .routers.book.borrow import borrow_router
from .routers.faculty import faculty_router
from .routers.token import lib_login_router
from .routers.book.reserve import reserve_router
from ..openapi_meta.tag import librarian_tags_metadata
from fastapi import FastAPI


librarian = FastAPI(title="College Library (Librarian App)",
                    contact=app_metadata.contact,
                    openapi_tags=librarian_tags_metadata)


librarian.include_router(lib_login_router)
librarian.include_router(account_router)
librarian.include_router(book_router)
librarian.include_router(borrow_router)
librarian.include_router(reserve_router)
librarian.include_router(faculty_router)
