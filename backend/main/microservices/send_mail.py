#!/usr/bin/python3
"""
This module contains the microservices for handling sending out emails using
mailsender
"""
from fastapi import HTTPException
from fastapi import status
from mailersend import emails
from requests.exceptions import ConnectionError
from os import getenv

API_KEY = getenv("MAILERSEND_API_KEY")
EMAIL = "MS_XdcwG0@trial-o65qngkv9p8lwr12.mlsender.net"
mailer = emails.NewEmail(API_KEY)

mail_body = {}

mail_from = {
    "email": EMAIL
}


async def send_code(user_email: str, code: str):
    """utility function to send verification code to email"""
    recipient = [
        {
            "email": user_email
        }
    ]

    personalization = [
        {
            "email": user_email,
            "data": {
                "code": code
            }
        }
    ]

    template_id = "zr6ke4nzn8e4on12"
    mailer.set_mail_from(mail_from, mail_body)
    mailer.set_mail_to(recipient, mail_body)
    mailer.set_subject("Email Verification", mail_body)
    mailer.set_template(template_id, mail_body)
    mailer.set_advanced_personalization(personalization, mail_body)

    try:
        response_str = mailer.send(mail_body)
        if not response_str.startswith("202"):
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="couldn't send verification email"
            )
    except ConnectionError:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="couldn't establish connection with mailersend api"
        )
