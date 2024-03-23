#!/usr/bin/python3
"""
This module contains utility function for instantiating a redis cursor
"""
from redis import Redis


def redis_cursor():
    """instantiate redis for use as a dependency"""
    try:
        cursor = Redis()
        yield cursor
    finally:
        cursor.close()
