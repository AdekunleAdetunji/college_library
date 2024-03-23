#!/usr/bin/python3
"""
This module contains function to verify login info
"""
from ..schemas.liberarian import Liberarian
from ..schemas.user import User
from ..cursor.cursor import Cursor
from fastapi import HTTPException
from fastapi import status
from os import getenv

INV_INFO_EXC = HTTPException(detail="invalid username or password",
                             status_code=status.HTTP_401_UNAUTHORIZED)


def verify_info(supplied_username: str, supplied_password: str,
                is_admin: bool = False, is_liberarian: bool = False,
                cursor: Cursor | None = None):
    """function to verify the supplied username and password"""
    if is_admin:
        saved_username = getenv("ADMIN_USERNAME")
        saved_password = getenv("ADMIN_PASSWORD")
        if (supplied_username != saved_username
                or supplied_password != saved_password):
            raise INV_INFO_EXC
    elif is_liberarian:
        liberarian = cursor.get(Liberarian, supplied_username)
        if (not liberarian or liberarian.password != supplied_password):
            raise INV_INFO_EXC
    else:
        user = cursor.get(User, supplied_username)
        if (not user or user.password != supplied_password):
            raise INV_INFO_EXC
