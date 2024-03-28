#!/usr/bin/python3
"""
This module contains the tag model to hold all tag names
"""
from enum import Enum


sign_in_desc = """Operation(s) to sign in. The sign in **logic** is here"""

sign_up_desc = """Operations with signing up. The sign-up **logic** is here."""

reset_pass_desc = """Operations to reset password in case of a forgotten
password. The reset password **logic** is here.
"""

ind_info_desc = """Operations to manage the retrieval of information about a
librarian/staff or a liberary user.
"""

book_operations = """Routers to manage all activities relating to a **book**."""

faculty_operations = """Routers to manage all activities relating to library
**faculty**."""

tags_metadata = [
    {"name": "Sign up",
     "description": sign_up_desc},
    {"name": "Sign in",
     "description": sign_in_desc},
    {"name": "Book Operations",
     "description": book_operations},
    {"name": "Faculty Operations",
     "description": faculty_operations},
    {"name": "Get Individual Information",
     "description": ind_info_desc},
    {"name": "Reset password",
     "description": reset_pass_desc},
]

admin_tags_metadata = [tags_metadata[0], tags_metadata[1],
                       tags_metadata[4], tags_metadata[3]]
librarian_tags_metadata = [tags_metadata[1],
                           tags_metadata[5],
                           tags_metadata[2],
                           tags_metadata[3],
                           tags_metadata[4]]
user_tags_metadata = tags_metadata


class Tags(Enum):
    get_ind_info = "Get Individual Information"
    book = "Book Operations"
    reset_pass = "Reset password"
    sign_in = "Sign in"
    sign_up = "Sign up"
    faculty = "Faculty Operations"