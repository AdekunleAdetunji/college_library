#!/usr/bin/python3
"""
This module contains the admin application that handles all routing relating to
the admin
"""
from main.openapi_meta import app_metadata
from .routers.token import admin_login
from .routers.librarian import admin_librarian
from .routers.faculty import admin_faculty
from ..authentication.verify_token import oauth2_scheme
from ..authentication.verify_token import verify_token
from ..cursor.cursor import Cursor
from ..openapi_meta.tag import admin_tags_metadata
from ..openapi_meta.tag import Tags
from ..pydantic_models.basemodel import UniBaseModel
from ..schemas.staff import Staff
from fastapi import FastAPI
from fastapi import Depends
from fastapi import status
from fastapi.exceptions import HTTPException
from typing import Annotated


admin = FastAPI(title="College Library (Admin App)",
                contact=app_metadata.contact,
                openapi_tags=admin_tags_metadata
                )


@admin.get("/get-staff", response_model=UniBaseModel, tags=[Tags.get_ind_info])
async def get_staff(uni_id: str,
                    token: Annotated[str, Depends(oauth2_scheme)],
                    uni_cursor: Cursor = Depends(Cursor(db="university"))):
    """route to get a staff info from the university database"""
    verify_token(token)
    staff = uni_cursor.get(Staff, uni_id)
    if not staff:
        raise HTTPException(detail="staff not found",
                            status_code=status.HTTP_404_NOT_FOUND)
    return staff

admin.include_router(admin_login)
admin.include_router(admin_librarian)
admin.include_router(admin_faculty)
