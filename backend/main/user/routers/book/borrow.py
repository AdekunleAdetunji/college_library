#!/usr/bin/python3
"""
This module contains operation functions dealing with the book borrows
"""
from ....authentication.verify_token import oauth2_scheme
from ....authentication.verify_token import verify_token
from ....cursor.cursor import Cursor
from ....openapi_meta.tag import Tags
from ....pydantic_models.borrow import UserBorrowModel
from ....schemas.user import User
from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from redis import Redis
from typing import Annotated

borrow_router = APIRouter()


@borrow_router.get("/user-borrows", response_model=list[UserBorrowModel],
                   status_code=status.HTTP_200_OK,
                   tags=[Tags.book])
async def user_borrows(user_id: str,
                       token: Annotated[str, Depends(oauth2_scheme)],
                       lib_cursor: Cursor = Depends(Cursor())):
    """route to get all books borrowed by a user"""
    token_dict = verify_token(token)
    if user_id != token_dict["sub"]:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="access denied")

    user = lib_cursor.get(User, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="user not found")

    return user.borrows


@borrow_router.get("/book-in-borrows", response_model=bool, tags=[Tags.book],
                   status_code=status.HTTP_200_OK)
async def book_in_borrows(user_id: str,
                          book_id: str,
                          token: Annotated[str, Depends(oauth2_scheme)],
                          lib_cursor: Cursor = Depends(Cursor())):
    """route to check if a book in user borrows"""
    token_dict = verify_token(token)
    if user_id != token_dict["sub"]:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="access denied")

    user = lib_cursor.get(User, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="user not found")

    for book_borrowed in user.borrows:
        if book_borrowed.book.uni_id == book_id and book_borrowed.active:
            return True

    return False
