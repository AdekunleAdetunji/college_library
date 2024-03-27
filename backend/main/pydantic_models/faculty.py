#!/usr/bin/python3
"""
This module contains pydantic module to validate input and output data into
the library faculty table
"""
from .basemodel import BaseIn
from .basemodel import BaseOut


class FacultyModelIn(BaseIn):
    "model to validate data going into the table"
    uni_id: str
    name: str | None = None


class FacultyModelOut(FacultyModelIn, BaseOut):
    """model to validate model going out of the table"""
    pass
