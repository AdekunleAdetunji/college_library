#!/usr/bin/python3
"""This module contains admin routers to interact with the library faculties"""
from ...authentication.verify_token import oauth2_scheme
from ...authentication.verify_token import verify_token
from ...cursor.cursor import Cursor
from ...openapi_meta.tag import Tags
from ...microservices.celery.tasks import sync_faculty
from ...pydantic_models.faculty import FacultyModelIn
from ...pydantic_models.faculty import FacultyModelOut
from ...schemas.faculty import Faculty
from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from typing import Annotated

admin_faculty = APIRouter()


@admin_faculty.get("/faculties", status_code=status.HTTP_200_OK,
                   response_model=list[FacultyModelIn], tags=[Tags.faculty])
async def get_faculties(token: Annotated[str, Depends(oauth2_scheme)],
                        lib_cursor: Cursor = Depends(Cursor())):
    verify_token(token)
    all_faculties = lib_cursor.all(Faculty)
    return all_faculties


@admin_faculty.post("/add-faculty", status_code=status.HTTP_201_CREATED,
                    response_model=list[FacultyModelOut], tags=[Tags.faculty])
async def add_faculty(body: list[FacultyModelIn],
                      token: Annotated[str, Depends(oauth2_scheme)],
                      lib_cursor: Cursor = Depends(Cursor())):
    """router to allow admin add a new faculty not in university database"""
    verify_token(token)
    if not body:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                            detail="faculty list can not be empty")

    for faculty in body:
        lib_faculty = lib_cursor.get(Faculty, faculty.uni_id)
        if not lib_faculty:
            faculty_dict = faculty.model_dump()
            lib_cursor.new(Faculty, **faculty_dict)
    lib_cursor.save()

    faculties = lib_cursor.all(Faculty)
    return faculties


@admin_faculty.put("/sync-faculty", status_code=status.HTTP_201_CREATED,
                   response_model=bool, tags=[Tags.faculty])
async def sync_faculty(token: Annotated[str, Depends(oauth2_scheme)]):
    """
    router to synchronize the school table in university table with the library
    faculty table
    """
    sync_faculty.delay()
