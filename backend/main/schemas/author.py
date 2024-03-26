#!/usr/bin/python3
"""
This module contains the ORM class to interact with the author table
"""
from .basemodel import Basemodel
from .junctions.author_book import author_book
from ..cursor.base import Base
from sqlalchemy import Column
from sqlalchemy import String
from sqlalchemy_utils import EmailType
from sqlalchemy.orm import relationship

class Author(Basemodel, Base):
    """Author ORM"""
    __tablename__ = "authors"
    firstname = Column(String(50), nullable=False)
    lastname = Column(String(50), nullable=False)
    middlename = Column(String(50), nullable=True)
    email = Column(EmailType(100), nullable=True)
    books = relationship("Book", secondary=author_book,
                        back_populates="authors")