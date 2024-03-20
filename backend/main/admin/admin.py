#!/usr/bin/python3
"""
This module contains the admin application that handles all routing relating to
the admin
"""
from .routers.token import admin_login
from .routers.liberarian import admin_liberarian
from ..authentication.auth_var import access_token_expires_admin
from ..authentication.verify_token import oauth2_scheme
from ..authentication.verify_token import verify_token
from ..cursor.cursor import Cursor
from ..pydantic_models.staff import StaffModel
from ..schemas.staff import Staff
from fastapi import FastAPI
from fastapi import Depends
from fastapi import status
from fastapi.exceptions import HTTPException
from typing import Annotated

admin = FastAPI()


@admin.get("/get_staff", response_model=StaffModel)
async def get_staff(staff_no: str,
                    token: Annotated[str, Depends(oauth2_scheme)],
                    uni_cursor: Cursor = Depends(Cursor(db="university"))):
    """route to get a staff info from the university database"""
    verify_token(token)
    staff = uni_cursor.get_staff(Staff, staff_no)
    if not staff:
        raise HTTPException(detail="staff not found",
                            status_code=status.HTTP_404_NOT_FOUND)
    return staff

admin.include_router(admin_login)
admin.include_router(admin_liberarian)
