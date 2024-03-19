#!/usr/bin/python3
"""
This module contains the pydantic model to hold the generated jwt
"""
from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str
