#!/usr/bin/python3
"""This module contains the app to manage celery tasks"""
from celery import Celery


task_path = "main.microservices.celery.tasks"
app = Celery(
    "main",
    backend="redis://localhost:6379/",
    broker="redis://localhost:6379/",
    include=[task_path]
)