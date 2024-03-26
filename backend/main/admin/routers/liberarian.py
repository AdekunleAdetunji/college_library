#!/usr/bin/python3
"""
This module contains the routers to manage activities that admin can perform on
a liberarian
"""
from ...authentication.verify_token import oauth2_scheme
from ...authentication.verify_token import verify_token
from ...cursor.cursor import Cursor
from ...openapi_meta.tag import Tags
from ...pydantic_models.liberarian import LiberarianModelOut
from ...pydantic_models.liberarian import LiberarianModelIn
from ...pydantic_models.liberarian import LibRegModel
from ...schemas.liberarian import Liberarian
from ...schemas.staff import Staff
from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from sqlalchemy.exc import IntegrityError
from typing import Annotated

admin_liberarian = APIRouter()


@admin_liberarian.get("/get-liberarian", response_model=LiberarianModelOut,
                      status_code=status.HTTP_200_OK, tags=[Tags.get_ind_info],
                      response_model_exclude=["password"])
async def get_liberarian(uni_id: str,
                         token: Annotated[str, Depends(oauth2_scheme)],
                         lib_cursor: Cursor = Depends(Cursor())):
    """route to get info of a registered liberarian"""
    verify_token(token)
    liberarian = lib_cursor.get(Liberarian, uni_id)
    if not liberarian:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="liberarian does not exist")
    return liberarian


@admin_liberarian.post("/add-liberarian", response_model=LiberarianModelOut,
                       status_code=status.HTTP_201_CREATED,
                       tags=[Tags.sign_up])
async def register_liberarian(body: LibRegModel,
                              token: Annotated[str, Depends(oauth2_scheme)],
                              uni_cursor: Cursor = Depends(Cursor(
                                  db="university")),
                              lib_cursor: Cursor = Depends(Cursor())):
    """register a new liberarian to the liberary"""
    verify_token(token)
    staff = uni_cursor.get(Staff, body.uni_id)
    if not staff:
        raise HTTPException(detail="staff not found",
                            status_code=status.HTTP_404_NOT_FOUND)

    staff_dict = {"firstname": staff.firstname, "lastname": staff.lastname,
                  "middlename": staff.middlename, "email": staff.email,
                  "phone_no": staff.phone_no, "password": body.new_password,
                  "uni_id": staff.uni_id}
    liberarian = LiberarianModelIn(**staff_dict)
    try:
        liberarian = lib_cursor.new(Liberarian, **liberarian.model_dump())
        lib_cursor.save()
        return liberarian
    except IntegrityError:
        raise HTTPException(detail="liberarian already registered",
                            status_code=status.HTTP_409_CONFLICT)
    