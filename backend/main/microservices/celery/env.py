#!/usr/bin/python3
"""This module contains celery task constants"""
from datetime import timedelta

release_duration = timedelta(minutes=2)

reserve_duration = timedelta(minutes=2)

reserve_schedule = 30
whitelist_schedule = 1
