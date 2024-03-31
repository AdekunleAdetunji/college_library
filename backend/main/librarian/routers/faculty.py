#!/usr/bin/python3
"""This module contains librarian routes relating to faculty operations"""
from ...authentication.verify_token import oauth2_scheme
from ...authentication.verify_token import verify_token
from ...cursor.cursor import Cursor
from ...openapi_meta.tag import Tags
from ...pydantic_models.faculty import FacultyModelIn
from ...schemas.faculty import Faculty
from ...schemas.librarian import Librarian
from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from typing import Annotated

faculty_router = APIRouter()


@faculty_router.get("/faculties", status_code=status.HTTP_200_OK,
                    response_model=list[FacultyModelIn], tags=[Tags.faculty])
async def get_faculties(lib_id: str,
                        token: Annotated[str, Depends(oauth2_scheme)],
                        lib_cursor: Cursor = Depends(Cursor())):
    token_dict = verify_token(token)
    if lib_id != token_dict["sub"]:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="access denied")

    librarian = lib_cursor.get(Librarian, lib_id)
    if not librarian:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="librarian not found")

    all_faculties = lib_cursor.all(Faculty)
    return all_faculties
