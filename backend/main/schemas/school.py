#!/usr/bin/python3
"""
This module contains the school ORM for accessing the schools in the
university
"""
from ..cursor.base import Base
from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String


class School(Base):
    """university faculty table ORM"""
    __tablename__ = "schools"
    id = Column(Integer, autoincrement=True, nullable=False, primary_key=True)
    name = Column(String(100), nullable=False)
    uni_id = Column(String(8), nullable=False)
