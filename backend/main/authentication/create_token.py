#!/usr/bin/python3
"""
This module contains the function used to generate JWT after successful sign in
"""
from .auth_var import ALGORITHM
from .auth_var import SECRET_KEY
from datetime import datetime
from datetime import timedelta
from datetime import timezone
from jose import jwt
from jose import JWTError


def create_access_token(data: dict, expires_delta: timedelta):
    """create JWT after successful login into the application"""
    to_encode = data.copy()
    expire_time = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire_time})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, ALGORITHM)
    return encoded_jwt
