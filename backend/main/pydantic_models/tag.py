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

tags_metadata = [
    {"name": "Sign up",
     "description": sign_up_desc},
    {"name": "Get Individual Information",
     "description": ind_info_desc},
    {"name": "Reset password",
     "description": reset_pass_desc}
]


class Tags(Enum):
    get_ind_info = "Get Individual Information"
    reset_pass = "Reset password"
    sign_in = "Sign in"
    sign_up = "Sign up"