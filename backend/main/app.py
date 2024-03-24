#!/usr/bin/python3
"""
Main application module for the College Library.

This module contains the main FastAPI application on which the admin,
librarian, and student applications are mounted.
"""
from .admin import admin
from .liberarian import liberarian
from .openapi_meta import app_metadata
from .user import user
from fastapi import FastAPI

# Create the FastAPI application
app = FastAPI(title="College Library",
              description=app_metadata.description,
              contact=app_metadata.contact,
              version="0.0.1")

app.mount(path="/admin", app=admin.admin)
app.mount(path="/librarian", app=liberarian.liberarian)
app.mount(path="/user", app=user.user)
