#!/usr/bin/python3
"""
This module contains the ORM for the librarian table
"""
from .basemodel import Basemodel
from ..cursor.base import Base
from sqlalchemy import Column
from sqlalchemy import String
from sqlalchemy_utils import EmailType
from sqlalchemy_utils import PasswordType


class Liberarian(Basemodel, Base):
    """ORM for the librarian table"""
    __tablename__ = "librarians"
    firstname = Column(String(50), nullable=False)
    lastname = Column(String(50), nullable=False)
    middlename = Column(String(50), nullable=True)
    staff_no = Column(String(20), nullable=False, unique=True)
    password = Column(String(8), nullable=False)
    email = Column(EmailType(100), nullable=False, unique=True)
    phone_no = Column(String(20), nullable=False)
