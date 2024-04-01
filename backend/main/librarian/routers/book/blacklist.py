#!/usr/bin/python3
"""
This module contains the router and functions to handles librarian app
operations relating to blacklists
"""
import json
from ....authentication.verify_token import oauth2_scheme
from ....authentication.verify_token import verify_token
from ....cursor.cursor import Cursor
from ....cursor.redis_cursor import redis_cursor
from ....openapi_meta.tag import Tags
from ....pydantic_models.redis import BlacklistBookModel
from ....schemas.book import Book
from ....schemas.librarian import Librarian
from ....schemas.user import User
from datetime import datetime
from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from redis import Redis
from typing import Annotated

blacklists_router = APIRouter()


@blacklists_router.get("/user-blacklists", status_code=status.HTTP_200_OK,
                       tags=[Tags.book],
                       response_model=list[BlacklistBookModel])
async def user_blacklists(lib_id: str, user_id: str,
                          token: Annotated[str, Depends(oauth2_scheme)],
                          lib_cursor: Cursor = Depends(Cursor()),
                          red_cursor: Redis = Depends(redis_cursor)):
    """route to get books in user blacklists"""
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

    blacklists = red_cursor.get("blacklists")
    try:
        blacklists = json.loads(blacklists)

        user_blacklists = blacklists.get(user_id)
        if not user_blacklists:
            return []

        user_book_list = []
        for book_uuid, expire_delta in user_blacklists.items():
            book = lib_cursor.get(Book, book_uuid)
            book_dict = book.to_dict()
            book_dict["expire_date"] = datetime.fromisoformat(expire_delta)
            user_book_list.append(book_dict)

        return user_book_list
    except TypeError as t:
        return []
