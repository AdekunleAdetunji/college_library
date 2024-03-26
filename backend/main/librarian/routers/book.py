#!/usr/bin/python3
"""
This module contains router to handle librarian operation pertaining to a book
"""
from ...authentication.verify_token import oauth2_scheme
from ...authentication.verify_token import verify_token
from ...cursor.cursor import Cursor
from ...openapi_meta.tag import Tags
from ...pydantic_models.book import BookModelIn
from ...pydantic_models.book import BookModelOut
from ...pydantic_models.faculty import FacultyModelIn
from ...schemas.book import Book
from ...schemas.author import Author
from ...schemas.faculty import Faculty
from ...schemas.school import School
from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from sqlalchemy.exc import IntegrityError
from typing import Annotated


book_router = APIRouter()


@book_router.post("/add-book", response_model=BookModelOut, tags=[Tags.book])
async def add_new_book(
    lib_id: str,
    body: BookModelIn,
    token: Annotated[str, Depends(oauth2_scheme)],
    lib_cursor: Cursor = Depends(Cursor()),
    uni_cursor: Cursor = Depends(Cursor("university"))
):
    """route for librarian to add a new book to the library book collection"""
    token_id = verify_token(token)
    if lib_id != token_id["sub"]:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="access denied")
    try:
        book_dict = body.model_dump()
        authors = book_dict.pop("authors")
        faculties = book_dict.pop("faculties")
        book = lib_cursor.new(Book, **book_dict)
        
        for faculty in faculties:
            uni_faculty_id = faculty["uni_id"]
            school = uni_cursor.get(School, uni_faculty_id)
            faculty = lib_cursor.get(Faculty, uni_faculty_id)
            if not school and not faculty:
                    raise HTTPException(
                          status_code=status.HTTP_404_NOT_FOUND,
                          detail="faculty not found, contact admin"
                        )
            if school and not faculty:
                school = FacultyModelIn.model_validate(school)
                faculty = lib_cursor.new(Faculty, **school.model_dump())
            book.faculties.append(faculty)

        for author in authors:
            author_in_db = lib_cursor.get_by_name(Author, names=author)
            if not author_in_db:
                author_in_db = lib_cursor.new(Author, **author)
            book.authors.append(author_in_db)
        
        lib_cursor.save()
        return book
    except IntegrityError:
         raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                             detail="book already exists")