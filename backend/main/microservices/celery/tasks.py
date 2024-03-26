#!/usr/bin/python3
"""
This module contains celery tasks function definitions
"""
import json
from .app import app
from ..compose_mail import mail_body
from ..compose_mail import code_mailer
from ..gen_code import gen_random_code
from redis import Redis
from datetime import timedelta


@app.task(bind=True, max_retries=2, default_retry_delay=1)
def send_code(self, user_dict: dict):
    """task manager for sending mail"""
    user_email = user_dict["email"]
    code = gen_random_code()
    mailer = code_mailer(user_email, code)
    try:
        res = mailer.send(mail_body)
        if not res.startswith("202"):
            raise Exception("Invalid email template")
        user_dict.update({"code": code})
        user_json = json.dumps(user_dict)
        code_expire_time = timedelta(minutes=10)
        uni_id = user_dict["uni_id"]
        with Redis() as red_cursor:
            red_cursor.setex(uni_id, code_expire_time, user_json)
        return True
    except Exception as e:
        self.retry(exc=e)