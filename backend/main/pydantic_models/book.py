#!/usr/bin/python3
"""
This module contains pydantic models that validate book info going in and out
of the library books database
"""
from .basemodel import BaseIn
from .basemodel import BaseOut
from .author import AuthorModelIn
from .author import AuthorModelOut
from .faculty import FacultyModelOut
from datetime import date
from pydantic import Field


class BookModelIn(BaseIn):
    """model to validate book input data into the book table"""
    title: str
    description: str
    faculties: list
    uni_id: str = Field(max_length=13)  # this is the book isbn number
    publisher: str | None = None
    publish_year: date | None = None
    authors: list[AuthorModelIn]
    quantity: int


class BookModelOut(BaseOut, BookModelIn):
    """model to validate book output data from the book table"""
    authors: list[AuthorModelOut]
    faculties: list[FacultyModelOut]
