#!/usr/bin/python3
"""
This module contains the pydantic model for the liberian data validation
"""
from .basemodel import BaseIn
from .basemodel import LibBaseModel
from .basemodel import UniBaseModel


class LibRegModel(BaseIn):
    """Librarian registration model"""
    uni_id: str
    new_password: str

class LibrarianModelOut(LibBaseModel):
    """Librarian data validator"""
    pass


class LibrarianModelIn(UniBaseModel):
    """Librarian data validator for insertion into the librarian table"""
    password: str
