#!/usr/bin/python3
"""
This modules contains operation function that pertain to the redis
reserves
"""
import json
from ....authentication.verify_token import oauth2_scheme
from ....authentication.verify_token import verify_token
from ....cursor.cursor import Cursor
from ....cursor.redis_cursor import redis_cursor
from ....openapi_meta.tag import Tags
from ....pydantic_models.redis import ReserveBookModel
from ....schemas.book import Book
from ....schemas.user import User
from datetime import datetime
from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from redis import Redis
from typing import Annotated

reserves_router = APIRouter()


@reserves_router.get("/user-reserves", status_code=status.HTTP_200_OK,
                     tags=[Tags.book], response_model=list[ReserveBookModel])
async def user_reserves(user_id: str,
                        token: Annotated[str, Depends(oauth2_scheme)],
                        lib_cursor: Cursor = Depends(Cursor()),
                        red_cursor: Redis = Depends(redis_cursor)):
    """route to get a users book reserves"""
    token_dict = verify_token(token)
    if user_id != token_dict["sub"]:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="access denied")

    user = lib_cursor.get(User, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="user not found")

    reserves = red_cursor.get("reserves")
    try:
        reserves = json.loads(reserves)

        user_reserves = reserves.get(user_id)
        if not user_reserves:
            return []

        user_book_list = []
        for book_uuid, expire_delta in user_reserves.items():
            book = lib_cursor.get(Book, book_uuid)
            book_dict = book.to_dict()
            book_dict["expire_date"] = datetime.fromisoformat(expire_delta)
            user_book_list.append(book_dict)

        return user_book_list
    except TypeError as t:
        return []


@reserves_router.get("/book-in-reserves", response_model=bool,
                     status_code=status.HTTP_200_OK, tags=[Tags.book])
def book_in_reserves(user_id: str, book_id: str,
                     token: Annotated[str, Depends(oauth2_scheme)],
                     lib_cursor: Cursor = Depends(Cursor()),
                     red_cursor: Redis = Depends(redis_cursor)):
    """route to check if a book in user reserves"""
    token_dict = verify_token(token)
    if user_id != token_dict["sub"]:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="access denied")

    user = lib_cursor.get(User, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="user not found")

    reserves = red_cursor.get("reserves")
    try:
        reserves = json.loads(reserves)
        user_reserves = reserves.get(user_id)
        if not user_reserves:
            return False

        if book_id not in user_reserves.keys():
            return False

        return True
    except TypeError as t:
        return False
