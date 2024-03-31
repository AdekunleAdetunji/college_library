#!/usr/bin/python3
"""
This module contains router to handle librarian operation pertaining to a book
"""
from ....authentication.verify_token import oauth2_scheme
from ....authentication.verify_token import verify_token
from ....cursor.cursor import Cursor
from ....openapi_meta.tag import Tags
from ....pydantic_models.book import BookModelIn
from ....pydantic_models.book import BookModelOut
from ....pydantic_models.faculty import FacultyModelIn
from ....schemas.book import Book
from ....schemas.author import Author
from ....schemas.faculty import Faculty
from ....schemas.librarian import Librarian
from ....schemas.school import School
from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from typing import Annotated
from sqlalchemy.exc import IntegrityError


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

    librarian = lib_cursor.get(Librarian, lib_id)
    if not librarian:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="librarian not found")

    try:
        book_in_db = lib_cursor.get(Book, body.uni_id)
        if book_in_db:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                                detail="book already exists")

        book_dict = body.model_dump()
        authors = book_dict.pop("authors")
        faculties = book_dict.pop("faculties")
        if not authors:
            raise HTTPException(
                  status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                  detail="authors can't be empty"
                  )

        if not faculties:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="faculty can't be empty")

        if not book_dict["quantity"] or book_dict["quantity"] < 1:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="invalid book quantity")

        book = lib_cursor.new(Book, **book_dict)

        for uni_faculty_id in faculties:
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
    except IntegrityError as ie:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="internal sever error")
