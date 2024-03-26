#!/usr/bin/python3
"""
This module contains the tag model to hold all tag names
"""
from enum import Enum

sign_up_desc = """Operations with signing up. The sign-up **logic** is here."""
reset_pass_desc = """Operations to reset password in case of a forgotten
password. The reset password **logic** is here.
"""
ind_info_desc = """Operations to manage the retrieval of information about a
liberarian/staff or a liberary user.
"""

book_operations = """Routers to manage all activities relating to a book."""

tags_metadata = [
    {"name": "Sign up",
     "description": sign_up_desc},
    {"name": "Book Operations",
     "description": book_operations},
    {"name": "Get Individual Information",
     "description": ind_info_desc},
    {"name": "Reset password",
     "description": reset_pass_desc},
]

admin_tags_metadata = [tags_metadata[0], tags_metadata[1]]
liberarian_tags_metadata = [tags_metadata[1], tags_metadata[3],
                            tags_metadata[2]]
user_tags_metadata = tags_metadata

class Tags(Enum):
    get_ind_info = "Get Individual Information"
    book = "Book Operations"
    reset_pass = "Reset password"
    sign_in = "Sign in"
    sign_up = "Sign up"