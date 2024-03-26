#!/usr/bin/python3
"""
This module contains the router that routes all book related operation 
performed by a library
"""
from ...authentication.verify_token import oauth2_scheme
from ...authentication.verify_token import verify_token
from ...cursor.cursor import Cursor
from ...openapi_meta.tag import Tags
from ...pydantic_models.book import BookModelOut
from ...pydantic_models.faculty import FacultyModelIn
from ...schemas.faculty import Faculty
from ...schemas.school import School
from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from typing import Annotated


book_router = APIRouter()


@book_router.get("/get-books", response_model=list[BookModelOut],
                 status_code=status.HTTP_200_OK, tags=[Tags.book])
async def get_faculty_books(user_uni_id: str, faculty_id: str,
                            token: Annotated[str, Depends(oauth2_scheme)],
                            lib_cursor: Cursor = Depends(Cursor()),
                            uni_cursor: Cursor = Depends(Cursor("university"))):
    """router to fetch all the books available in a school"""
    token_dict = verify_token(token)
    if token_dict["sub"] != user_uni_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="access denied")
    
    faculty = lib_cursor.get(Faculty, faculty_id)
    if not faculty:
        school = uni_cursor.get(School, faculty_id)
        if not school:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail="faculty not found")
        school = FacultyModelIn.model_validate(school)
        faculty = lib_cursor.new(Faculty, **school.model_dump())
        lib_cursor.save()
        faculty = lib_cursor.get(Faculty, faculty_id)
    
    return faculty.books
    