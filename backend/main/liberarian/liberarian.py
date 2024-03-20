#!/usr/bin/python3
"""
This module contains the admin application that handles all routing relating to
the liberarian
"""
from .routers.token import lib_login_router
from ..authentication.verify_token import oauth2_scheme
from ..authentication.verify_token import verify_token
from ..cursor.cursor import Cursor
from ..pydantic_models.liberarian import LiberarianModelOut
from ..schemas.liberarian import Liberarian
from fastapi import Depends
from fastapi import FastAPI
from fastapi import HTTPException
from fastapi import status
from typing import Annotated

liberarian = FastAPI()


@liberarian.get("/liberarian", status_code=status.HTTP_200_OK,
                response_model=LiberarianModelOut,
                response_model_exclude=["password"])
def get_lib_info(staff_no: str, token: Annotated[str, Depends(oauth2_scheme)],
                 lib_cursor: Cursor = Depends(Cursor())):
    """router to handle retrieval of liberarian info"""
    token_staff_no = verify_token(token=token)
    if token_staff_no["sub"] != staff_no:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="access denied")

    liberarian = lib_cursor.get_staff(Liberarian, staff_no)
    if not liberarian:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="liberarian does not exist")
    return liberarian


liberarian.include_router(lib_login_router)
