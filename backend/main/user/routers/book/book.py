#!/usr/bin/python3
"""
This module contains the router that routes all book related operation
performed by a library
"""
import json
from ....authentication.verify_token import oauth2_scheme
from ....authentication.verify_token import verify_token
from ....cursor.cursor import Cursor
from ....cursor.redis_cursor import redis_cursor
from ....microservices.celery.tasks import reserve_book
from ....openapi_meta.tag import Tags
from ....pydantic_models.book import BookModelOut
from ....schemas.book import Book
from ....schemas.user import User
from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from redis import Redis
from typing import Annotated


book_router = APIRouter()


@book_router.get("/get-books", response_model=list[BookModelOut],
                 status_code=status.HTTP_200_OK, tags=[Tags.book])
async def get_books(user_id: str,
                    token: Annotated[str, Depends(oauth2_scheme)],
                    lib_cursor: Cursor = Depends(Cursor())):
    """router to fetch all the books available in the library"""
    token_dict = verify_token(token)
    if token_dict["sub"] != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="access denied")

    user = lib_cursor.get(User, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="user not found")

    return lib_cursor.all(Book)


@book_router.get("/get-books/{book_id}", response_model=BookModelOut,
                 status_code=status.HTTP_200_OK, tags=[Tags.book])
async def get_books(user_id: str, book_id: str,
                    token: Annotated[str, Depends(oauth2_scheme)],
                    lib_cursor: Cursor = Depends(Cursor())):
    """router to fetch all the books available in the library"""
    token_dict = verify_token(token)
    if token_dict["sub"] != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="access denied")

    user = lib_cursor.get(User, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="user not found")

    book = lib_cursor.get(Book, book_id)
    if not book:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="book not found")

    return book


@book_router.post("/make-reservation", status_code=status.HTTP_200_OK,
                  tags=[Tags.book], response_model=bool)
async def make_reservation(book_id: str, user_id: str,
                           token: Annotated[str, Depends(oauth2_scheme)],
                           is_staff: bool = False,
                           red_cursor: Redis = Depends(redis_cursor),
                           lib_cursor: Cursor = Depends(Cursor())):
    """route to make reservation for a book"""
    token = verify_token(token)
    if user_id != token["sub"]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="access denied")

    user = lib_cursor.get(User, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="user not found")

    book = lib_cursor.get(Book, book_id)
    if not book:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="book not found")
    if book.quantity < 1:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="book out of stock")

    # check for active reservation that the user have
    reserves_json = red_cursor.get("reserves")
    try:
        reserves = json.loads(reserves_json)
    except TypeError as t:
        reserves = {}

    if reserves:
        user_reserves = reserves.get(user_id)
        if not user_reserves:
            user_reserves = {}

        if (not is_staff and len(user_reserves.keys()) > 3) or \
                (is_staff and len(user_reserves.keys()) > 4):
            raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                                detail="max reservation limit reached")
        if user_reserves:
            book_info = user_reserves.get(book.uni_id)
        else:
            book_info = {}

        if book_info:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                                detail="user already reserved book")

    # check for blacklist
    blacklists_json = red_cursor.get("blacklists")
    if blacklists_json:
        blacklists = json.loads(blacklists_json)
    else:
        blacklists = {}

    user_blacklists = blacklists.get(user_id)
    if user_blacklists:
        book_info = user_blacklists.get(book.uni_id)
    else:
        book_info = {}

    if book_info:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="user blacklisted from reserving book")

    # call celery reserve_book task to make reservation
    reserve_book.delay(user_id, book.uni_id)

    return True
