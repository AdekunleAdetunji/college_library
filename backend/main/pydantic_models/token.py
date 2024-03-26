#!/usr/bin/python3
"""
This module contains the pydantic model to hold the generated jwt
"""
from pydantic import BaseModel


class Token(BaseModel):
    """model for generated token"""
    access_token: str
    token_type: str
