#!/usr/bin/python3
"""
This module contains variables relating to authentication and JWT generation
"""
from datetime import timedelta

ALGORITHM = "HS256"
access_token_expires_admin = timedelta(days=1)
access_token_expires_lib = timedelta(days=1)
SECRET_KEY = "d05a69af3da8c5b3bacf4841fa9649ba395c8047a4fec8a0a59a630122ba6619"
