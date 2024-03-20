#!/usr/bin/python3
"""
This module contains the pydantic model for the liberian data validation
"""
from .basemodel import Base
from .staff import StaffModel


class LiberarianModelIn(StaffModel):
    """Liberarian data validator for insertion into the liberarian table"""
    password: str


class LiberarianModelOut(Base, LiberarianModelIn):
    """Liberarian data validator"""
    pass
