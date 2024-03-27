#!/usr/bin/python3
"""
This module contains the pydantic model for validating input and output data
into the author table
"""
from .basemodel import BaseIn
from .basemodel import BaseOut
from pydantic import EmailStr


class AuthorModelIn(BaseIn):
    """model to validate author input data"""
    firstname: str
    lastname: str
    middlename: str
    email: EmailStr | None = None


class AuthorModelOut(BaseOut, AuthorModelIn):
    """model to validate author output data"""
    pass
