#!/usr/bin/python3
"""
This module contains pydantic model to validate user book borrows
"""
from .basemodel import BaseIn
from .basemodel import BaseOut
from .basemodel import LibBaseModel
from datetime import datetime


class BookBorrowModel(BaseOut, BaseIn):
    """Book borrows model"""
    title: str
    uni_id: str


class UserBorrowModel(BaseOut, BaseIn):
    """User borrows model"""
    book: BookBorrowModel
    active: bool = True
    overdue: bool = False
    expire_time: datetime


class AllBorrowModel(UserBorrowModel):
    """All borrows model for the borrow table"""
    user: LibBaseModel
    librarian: LibBaseModel
