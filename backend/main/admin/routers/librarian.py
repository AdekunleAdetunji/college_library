#!/usr/bin/python3
"""
This module contains the routers to manage activities that admin can perform on
a librarian
"""
from ...authentication.verify_token import oauth2_scheme
from ...authentication.verify_token import verify_token
from ...cursor.cursor import Cursor
from ...openapi_meta.tag import Tags
from ...pydantic_models.librarian import LibrarianModelOut
from ...pydantic_models.librarian import LibrarianModelIn
from ...pydantic_models.librarian import LibRegModel
from ...schemas.librarian import Librarian
from ...schemas.staff import Staff
from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from sqlalchemy.exc import IntegrityError
from typing import Annotated

admin_librarian = APIRouter()


@admin_librarian.get("/get-librarian", response_model=LibrarianModelOut,
                     status_code=status.HTTP_200_OK, tags=[Tags.get_ind_info],
                     response_model_exclude=["password"])
async def get_librarian(uni_id: str,
                        token: Annotated[str, Depends(oauth2_scheme)],
                        lib_cursor: Cursor = Depends(Cursor())):
    """route to get info of a registered librarian"""
    verify_token(token)
    librarian = lib_cursor.get(Librarian, uni_id)
    if not librarian:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="librarian does not exist")
    return librarian


@admin_librarian.post("/add-librarian", response_model=LibrarianModelOut,
                      status_code=status.HTTP_201_CREATED,
                      tags=[Tags.sign_up])
async def register_librarian(body: LibRegModel,
                             token: Annotated[str, Depends(oauth2_scheme)],
                             uni_cursor: Cursor = Depends(Cursor(
                                 db="university")
                             ),
                             lib_cursor: Cursor = Depends(Cursor())):
    """register a new librarian to the liberary"""
    verify_token(token)
    staff = uni_cursor.get(Staff, body.uni_id)
    if not staff:
        raise HTTPException(detail="staff not found",
                            status_code=status.HTTP_404_NOT_FOUND)

    staff_dict = {"firstname": staff.firstname, "lastname": staff.lastname,
                  "middlename": staff.middlename, "email": staff.email,
                  "phone_no": staff.phone_no, "password": body.new_password,
                  "uni_id": staff.uni_id}
    librarian = LibrarianModelIn(**staff_dict)
    try:
        librarian = lib_cursor.new(Librarian, **librarian.model_dump())
        lib_cursor.save()
        return librarian
    except IntegrityError:
        raise HTTPException(detail="librarian already registered",
                            status_code=status.HTTP_409_CONFLICT)
