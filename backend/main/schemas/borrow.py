#!/usr/bin/python3
"""
This module contains the borrow ORM class
"""
from .basemodel import Basemodel
from ..cursor.base import Base
from sqlalchemy import Boolean
from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import DateTime
from sqlalchemy import String
from sqlalchemy import UUID


class Borrow(Basemodel, Base):
    """borrow table ORM"""
    __tablename__ = "borrows"
    book_uuid = Column(UUID, ForeignKey("books.id"), nullable=False)
    librarian_uuid = Column(UUID, ForeignKey("librarians.id"),
                            nullable=False)
    user_uuid = Column(UUID, ForeignKey("users.id"),  nullable=False)
    expire_time = Column(DateTime, nullable=False)
    active = Column(Boolean, nullable=False, default=True)
