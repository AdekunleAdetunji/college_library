#!/usr/bin/python3
"""
This module contains the junction table for establishing many-to-many
relationship between the authors table and the books table
"""
from ...cursor.base import Base
from sqlalchemy import Column
from sqlalchemy import String
from sqlalchemy import ForeignKey
from sqlalchemy import Table


author_book = Table(
        "author_book",
        Base.metadata,
        Column(
               "author_id",
              ForeignKey("authors.id", ondelete="CASCADE"),
              primary_key=True      
        ),
        Column(
            "book_id",
            ForeignKey("books.id", ondelete="CASCADE"),
            primary_key=True
        )
                     
)