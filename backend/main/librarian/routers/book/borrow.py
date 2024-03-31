#!/usr/bin/pyton3
"""This module contains operation functions to handle book borrows"""
import json
from ....authentication.verify_token import oauth2_scheme
from ....authentication.verify_token import verify_token
from ....cursor.cursor import Cursor
from ....cursor.redis_cursor import redis_cursor
from ....microservices.celery.tasks import approve_borrow
from ....openapi_meta.tag import Tags
from ....schemas.book import Book
from ....schemas.librarian import Librarian
from ....schemas.user import User
from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from redis import Redis
from typing import Annotated

borrow_router = APIRouter()


@borrow_router.post("/approve-borrow", status_code=status.HTTP_201_CREATED,
                    tags=[Tags.book])
async def approve(lib_id: str, user_id: str, book_id: str,
                  token: Annotated[str, Depends(oauth2_scheme)],
                  lib_cursor: Cursor = Depends(Cursor()),
                  red_cursor: Redis = Depends(redis_cursor)):
    """route to approve a library users book reservations"""
    token_dict = verify_token(token)
    if lib_id != token_dict["sub"]:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="access denied")

    librarian = lib_cursor.get(Librarian, lib_id)
    if not librarian:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="librarian not found")

    user = lib_cursor.get(User, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="user not found")

    # check if book in reserve
    reserves = red_cursor.get("reserves")
    try:
        reserves = json.loads(reserves)
    except TypeError as t:
        reserves = {}

    user_reserve = reserves.get(user_id)
    if not user_reserve:
        user_reserve = {}

    book_in_reserve = user_reserve.get(book_id)
    if not book_in_reserve:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="book not in user reserve")

    # check if number of active user borrows > 3 for student and  4 for staff
    user = lib_cursor.get(User, user_id)
    if ((user.is_staff and len(user.borrows) == 4) or
            (not user.is_staff and len(user.borrows) == 3)):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="maximum borrow limit reached")

    # check if book in active user borrows
    book = lib_cursor.get(Book, book_id)
    for borrow in user.borrows:
        if borrow.book_uuid == book.id and borrow.active:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                                detail="user already have a copy of book")
    # call celery function to approve borrow
    approve_borrow.delay(lib_id, user_id, book_id)

    return True


@borrow_router.put("/check-in", response_model=bool,
                   status_code=status.HTTP_201_CREATED, tags=[Tags.book])
async def check_in(lib_id: str, user_id: str, book_id: str,
                   token: Annotated[str, Depends(oauth2_scheme)],
                   lib_cursor: Cursor = Depends(Cursor())):
    """route to check back book into the database after a user returns book"""
    token_dict = verify_token(token)
    if lib_id != token_dict["sub"]:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="access denied")

    librarian = lib_cursor.get(Librarian, lib_id)
    if not librarian:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="librarian not found")

    user = lib_cursor.get(User, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="user not found")

    borrowed_book = None
    for book_borrow in user.borrows:
        if book_borrow.active and book_borrow.book.uni_id == book_id:
            borrowed_book = book_borrow
            break

    if not borrowed_book:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="book not in user borrows")

    # payment for overdue book to be implemented in future
    borrowed_book.book.quantity += 1
    borrowed_book.active = False
    lib_cursor.save()

    return True
