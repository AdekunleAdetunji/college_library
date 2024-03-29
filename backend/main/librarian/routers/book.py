#!/usr/bin/python3
"""
This module contains router to handle librarian operation pertaining to a book
"""
import json
from ...authentication.verify_token import oauth2_scheme
from ...authentication.verify_token import verify_token
from ...cursor.cursor import Cursor
from ...cursor.redis_cursor import redis_cursor
from ...microservices.celery.tasks import approve_borrow
from ...openapi_meta.tag import Tags
from ...pydantic_models.book import BookModelIn
from ...pydantic_models.book import BookModelOut
from ...pydantic_models.faculty import FacultyModelIn
from ...pydantic_models.redis import ReserveBookModel
from ...schemas.book import Book
from ...schemas.author import Author
from ...schemas.faculty import Faculty
from ...schemas.school import School
from ...schemas.user import User
from datetime import datetime
from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from redis import Redis
from typing import Annotated
from fastapi.responses import JSONResponse
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
    

@book_router.get("/reserves", status_code=status.HTTP_200_OK, tags=[Tags.book],
                 response_model=dict[str, list[ReserveBookModel]])
async def all_reserves(lib_id: str, 
                       token: Annotated[str, Depends(oauth2_scheme)],
                       lib_cursor: Cursor = Depends(Cursor()),
                       red_cursor: Redis = Depends(redis_cursor)):
    """route to get all book reserves"""
    token_dict = verify_token(token)
    if lib_id != token_dict["sub"]:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="access denied")

    reserves = red_cursor.get("reserves")
    reserves = json.loads(reserves)
    if not reserves:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="no user in reserve")
    
    reserves_out = {}
    for user_id, user_reserves in reserves.items():
        user_book_list = []
        for book_uuid, expire_delta in user_reserves.items():
            book = lib_cursor.get(Book, book_uuid)
            book_dict = book.to_dict()
            book_dict["expire_date"] = datetime.fromisoformat(expire_delta)
            user_book_list.append(book_dict)
        reserves_out[user_id] = user_book_list
    
    return reserves_out


@book_router.get("/user-reserves", status_code=status.HTTP_200_OK,
                 tags=[Tags.book], response_model=list[ReserveBookModel])
async def user_reserves(lib_id: str, user_id: str,
                        token: Annotated[str, Depends(oauth2_scheme)],
                        lib_cursor: Cursor = Depends(Cursor()),
                        red_cursor: Redis = Depends(redis_cursor)):
    """route to get a users book reserves"""
    token_dict = verify_token(token)
    if lib_id != token_dict["sub"]:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="access denied")
    
    user = lib_cursor.get(User, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="user not found")

    reserves = red_cursor.get("reserves")
    reserves = json.loads(reserves)
    if not reserves:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="no user in reserve")

    user_reserves = reserves.get(user_id)
    if not user_reserves:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="user reserve is empty")
    
    user_book_list = []
    for book_uuid, expire_delta in user_reserves.items():
        book = lib_cursor.get(Book, book_uuid)
        book_dict = book.to_dict()
        book_dict["expire_date"] = datetime.fromisoformat(expire_delta)
        user_book_list.append(book_dict)

    return user_book_list


@book_router.post("/approve-borrow", status_code=status.HTTP_201_CREATED,
                  tags=[Tags.book])
async def approve(lib_id: str, user_id: str, book_id: str,
                         token: Annotated[str, Depends(oauth2_scheme)],
                         lib_cursor: Cursor = Depends(Cursor()),
                         red_cursor: Redis = Depends(redis_cursor)):
    """route to approve a library users book reservations"""
    token_dict = verify_token(token)
    if lib_id != token_dict["sub"]:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="access denied")
    
    # check if book in reserve
    reserves = red_cursor.get("reserves")
    reserves = json.loads(reserves)
    if not reserves:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="no user in reserve")
    
    user_reserve = reserves.get(user_id)
    if not user_reserve:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="user reserve is empty")
    
    book_in_reserve = user_reserve.get(book_id)
    if not book_in_reserve:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="book not in reserve")

    # check if number of active user borrows > 3 for student and  4 for staff
    user = lib_cursor.get(User, user_id)
    if ((user.is_staff and len(user.borrows) == 4) or
            (not user.is_staff and len(user.borrows) == 3)):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="maximum borrow limit reached")
    
    # check if book in active user borrows
    book = lib_cursor.get(Book, book_id)
    for borrow in user.borrows:
        if borrow.book_uuid == book.id and borrow.active:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="user already have a copy of book")
    # call celery function to approve borrow
    approve_borrow.delay(lib_id, user_id, book_id)

    return True
