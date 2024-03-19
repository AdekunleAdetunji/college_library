#!/usr/bin/python3
"""
This module contains class to validate the staff table data
"""
from pydantic import BaseModel
from pydantic import EmailStr


class StaffModel(BaseModel):
    """Staff data validator class"""
    firstname: str
    lastname: str
    middlename: str
    email: EmailStr
    staff_no: str
    phone_no: str

    class Config:
        from_attributes = True
