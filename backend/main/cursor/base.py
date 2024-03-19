#!/usr/bin/python3
"""
This module contains the base sqlalchemy class
"""
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """Declarative base class for all tables"""
    pass
