#!/usr/bin/python3
"""
Main application module for the College Library.

This module contains the main FastAPI application on which the admin,
librarian, and student applications are mounted.
"""
from .admin import admin
from .liberarian import liberarian
from .user import user
from fastapi import FastAPI

# Overview description of the College Library application
description = """
# College Library

## Overview
The College Library application is designed to efficiently manage library
resources for educational institutions. It simplifies book management for
librarians while providing students with the ability to check book availability
and make reservations.

## Subapplications
Three apps are mounted on this app:
- **Admin**: Controls all actions related to administration.
  [Admin Documentation](http://localhost:8000/admin/docs)

- **Librarian**: Controls actions for librarians.
  [Librarian Documentation](http://localhost:8000/librarian/docs)

- **User**: Controls actions for library users.
  [User Documentation](http://localhost:8000/user/docs)
"""

# Contact information for the developer
contact = {
    "name": "Adekunle Adetunji",
    "url": "https://www.linkedin.com/in/adetunji-adekunle-835755233/",
    "email": "adekunleadetunjiwilson@gmail.com"
}

# Create the FastAPI application
app = FastAPI(title="College Library",
              description=description,
              contact=contact,
              version="0.0.1")

app.mount(path="/admin", app=admin.admin)
app.mount(path="/librarian", app=liberarian.liberarian)
app.mount(path="/user", app=user.user)
