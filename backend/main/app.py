#!/usr/bin/python3
"""
This module contains the main application on which the admin, liberarian and
student application are mounted
"""
from .admin import admin
from .liberarian import liberarian
from .user import user
from fastapi import FastAPI

app = FastAPI()

app.mount(path="/admin", app=admin.admin)
app.mount(path="/liberarian", app=liberarian.liberarian)
app.mount(path="/user", app=user.user)
