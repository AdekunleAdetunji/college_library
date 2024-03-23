#!/usr/bin/python3
"""
This module contains pydantic model that validates user data in and out of the
university database
"""
from .basemodel import UniBaseModel
from .basemodel import LibBaseModel


class UserModelIn(UniBaseModel):
    """User model to validate data going into the user table"""
    is_staff: bool = False
    password: str


class UserModelOut(LibBaseModel):
    """User model to validate data going out of the user table"""
    pass
