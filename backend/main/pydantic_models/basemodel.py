#!/usr/bin/python3
"""
This module contains the basemodel pydantic model for all other pydantic models
"""
from datetime import datetime
from pydantic import BaseModel
from pydantic import EmailStr
from uuid import UUID


class UniBaseModel(BaseModel):
    """Staff data validator class"""
    firstname: str
    lastname: str
    middlename: str
    email: EmailStr
    uni_id: str
    phone_no: str

    class Config:
        from_attributes = True


class LibBaseModel(UniBaseModel):
    """Pydantic model containing common attributes shared by other models"""
    id: UUID
    created_at: datetime
    updated_at: datetime
