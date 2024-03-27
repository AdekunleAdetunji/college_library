#!/usr/bin/python3
"""
This module contains the basemodel pydantic model for all other pydantic models
"""
from datetime import datetime
from pydantic import BaseModel
from pydantic import EmailStr
from uuid import UUID


class BaseIn(BaseModel):
    """Base model for all university tables"""
    class Config:
        from_attributes = True


class BaseOut():
    """Base model for all library database table"""
    id: UUID
    created_at: datetime
    updated_at: datetime


class UniBaseModel(BaseIn):
    """Staff data validator class"""
    firstname: str
    lastname: str
    middlename: str
    email: EmailStr
    uni_id: str
    phone_no: str


class LibBaseModel(BaseOut, UniBaseModel):
    """Pydantic model containing common attributes shared by other models"""
    pass
