#!/usr/bin/python3
"""
This module contains pydantic models for validating data coming from redis
"""
from .basemodel import BaseIn
from .basemodel import BaseOut
from datetime import datetime
from pydantic import Field


class ReserveBookModel(BaseIn, BaseOut):
    """model to validate books in reserve"""
    title: str
    uni_id: str
    description: str
    expire_date: datetime
