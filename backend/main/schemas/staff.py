#!/usr/bin/python3
"""
This module contains the staff ORM used to model the university student table
"""
from ..cursor.base import Base
from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy_utils import EmailType


class Staff(Base):
    """ORM for the university student table"""
    __tablename__ = "staffs"
    id = Column(Integer, primary_key=True)
    firstname = Column(String(50), nullable=False)
    lastname = Column(String(50), nullable=False)
    middlename = Column(String(50))
    uni_id = Column(String(20), nullable=False)
    email = Column(EmailType(100), nullable=False)
    phone_no = Column(String(20), nullable=False)
