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
from ..cursor.cursor import Cursor
from ..openapi_meta.tag import Tags
from ..openapi_meta.tag import user_tags_metadata
from ..pydantic_models.book import BookModelOut
from ..schemas.book import Book
from fastapi import Depends
from fastapi import FastAPI
from fastapi import HTTPException
from fastapi import status

user = FastAPI(title="College Library (User App)",
               contact=app_metadata.contact,
               openapi_tags=user_tags_metadata)


@user.get("/explore", response_model=list[BookModelOut],
          status_code=status.HTTP_200_OK, tags=[Tags.book])
async def explore(lib_cursor: Cursor = Depends(Cursor())):
    """router to fetch all the books available in the library"""

    return lib_cursor.all(Book)


@user.get("/explore/{book_id}", status_code=status.HTTP_200_OK,
          tags=[Tags.book], response_model=BookModelOut)
async def explore_a_book(book_id: str, lib_cursor: Cursor = Depends(Cursor())):
    """router to get a particular book"""
    book = lib_cursor.get(Book, book_id)
    if not book:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="book not found")

    return book


user.include_router(user_account_router)
user.include_router(book_router)
user.include_router(reserves_router)
user.include_router(borrow_router)
user.include_router(registration_router)
user.include_router(user_login_router)
user.include_router(faculty_router)
