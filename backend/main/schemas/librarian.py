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
from sqlalchemy.orm import relationship


class Librarian(Basemodel, Base):
    """ORM for the librarian table"""
    __tablename__ = "librarians"
    firstname = Column(String(50), nullable=False)
    lastname = Column(String(50), nullable=False)
    middlename = Column(String(50), nullable=True)
    uni_id = Column(String(20), nullable=False, unique=True)
    password = Column(PasswordType(schemes="md5_crypt"), nullable=False)
    email = Column(EmailType(100), nullable=False, unique=True)
    phone_no = Column(String(20), nullable=False)
    borrows = relationship("Borrow", backref="librarian",
                           cascade="all, delete")
