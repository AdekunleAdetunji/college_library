#!/usr/bin/python3
"""
This module contains the basemodel pydantic model for all other pydantic models
"""
from datetime import datetime
from uuid import UUID


class Base():
    """Pydantic model containing common attributes shared by other models"""
    id: UUID
    created_at: datetime
    updated_at: datetime
