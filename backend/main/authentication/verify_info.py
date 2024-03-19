#!/usr/bin/python3
"""
This module contains function to verify login info
"""
from fastapi import HTTPException
from fastapi import status
from os import getenv


def verify_info(supplied_username: str, supplied_password: str,
                admin: bool = True):
    """function to verify the supplied username and password"""
    if admin:
        saved_username = getenv("ADMIN_USERNAME")
        saved_password = getenv("ADMIN_PASSWORD")
        if (supplied_username != saved_username
                or supplied_password != saved_password):
            raise HTTPException(detail="invalid username or password",
                                status_code=status.HTTP_401_UNAUTHORIZED)
    else:
        # Write logic for other sign in asides admin
        pass
