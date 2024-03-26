#!/usr/bin/python3
"""
This module contains the ORM used to interact with the library books table
"""
from ..cursor.base import Base
from .basemodel import Basemodel
from .junctions.author_book import author_book
from .junctions.faculty_book import faculty_book
from sqlalchemy import Column
from sqlalchemy import Date
from sqlalchemy import String
from sqlalchemy.orm import relationship


class Book(Basemodel, Base):
    """Books ORM"""
    __tablename__ = "books"
    title = Column(String(100), nullable=False)
    summary = Column(String(1000), nullable=False)
    uni_id = Column(String(13), nullable=False, unique=True)
    publisher = Column(String(50), nullable=True)
    publish_year = Column(Date(), nullable=True)
    authors = relationship("Author", secondary=author_book,
                           back_populates="books")
    faculties = relationship("Faculty", secondary=faculty_book,
                             back_populates="books")
    