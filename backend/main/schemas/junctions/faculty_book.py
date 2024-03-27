#!/usr/bin/python3
"""
This module contains the faculty and books junction table for establishing
many-to-many relationship between the faculty and books table
"""
from ...cursor.base import Base
from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Table


faculty_book = Table(
        "faculty_book",
        Base.metadata,
        Column(
            "faculty_id",
            ForeignKey("faculties.id", ondelete="CASCADE"),
            primary_key=True
        ),
        Column(
            "book_id",
            ForeignKey("books.id", ondelete="CASCADE"),
            primary_key=True
        )

)
