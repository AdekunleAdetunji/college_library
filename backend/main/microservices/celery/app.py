#!/usr/bin/python3
"""This module contains the app to manage celery tasks"""
from celery import Celery
from celery.schedules import crontab


task_path = "main.microservices.celery.tasks"
app = Celery(
    "main",
    backend="redis://localhost:6379/",
    broker="redis://localhost:6379/",
    include=[task_path]
)

app.conf.beat_schedule = {
    "check_reserve": {
        "task": "main.microservices.celery.tasks.check_reserves",
        "schedule": 30
    },
    "whitelist": {
        "task": "main.microservices.celery.tasks.whitelist",
        "schedule": 30
    }
}
