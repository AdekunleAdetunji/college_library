#!/usr/bin/python3
"""
This module contains an ORM used to interact with the faculty table
"""
from .basemodel import Basemodel
from .junctions.faculty_book import faculty_book
from ..cursor.base import Base
from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.orm import relationship


class Faculty(Basemodel, Base):
    """Library faculty table ORM"""
    __tablename__ = "faculties"
    name = Column(String(100), nullable=False, unique=True)
    uni_id = Column(String(8), nullable=False, unique=True)
    books = relationship("Book", secondary=faculty_book,
                         back_populates="faculties")