#!/usr/bin/python3
"""
This module contains the ORM used to interact with library user table
"""
from ..cursor.base import Base
from ..schemas.basemodel import Basemodel
from sqlalchemy import Column
from sqlalchemy import Boolean
from sqlalchemy import String
from sqlalchemy_utils import PasswordType
from sqlalchemy.orm import relationship


class User(Basemodel, Base):
    """ORM to interact with the library user table"""
    __tablename__ = "users"
    firstname = Column(String(50), nullable=False)
    lastname = Column(String(50), nullable=False)
    middlename = Column(String(50), nullable=True)
    uni_id = Column(String(20), nullable=False)
    email = Column(String(100), nullable=False)
    password = Column(PasswordType(schemes="md5_crypt"), nullable=True)
    phone_no = Column(String(20), nullable=False)
    is_staff = Column(Boolean, nullable=False)
    borrows = relationship("Borrow", backref="user")
