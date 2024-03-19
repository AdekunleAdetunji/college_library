#!/usr/bin/python3
"""
This module contains function to verify JWT generated on login
"""
from .auth_var import ALGORITHM
from .auth_var import SECRET_KEY
from fastapi import HTTPException
from fastapi import status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from jose import JWTError

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def verify_token(token: OAuth2PasswordBearer):
    """verify the validity of a token sent with a request"""
    credential_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credential",
        headers={"WWW-Authenticate": "Bearer"})
    try:
        payload = jwt.decode(token, SECRET_KEY, ALGORITHM)
        username: str = payload.get("sub")
        if not username:
            raise credential_exception
    except JWTError:
        raise credential_exception
