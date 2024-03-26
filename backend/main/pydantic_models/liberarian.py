#!/usr/bin/python3
"""
This module contains the pydantic model for the liberian data validation
"""
from .basemodel import BaseIn
from .basemodel import LibBaseModel
from .basemodel import UniBaseModel


class LibRegModel(BaseIn):
    """Liberarian registration model"""
    uni_id: str
    new_password: str

class LiberarianModelOut(LibBaseModel):
    """Liberarian data validator"""
    pass


class LiberarianModelIn(UniBaseModel):
    """Liberarian data validator for insertion into the liberarian table"""
    password: str
