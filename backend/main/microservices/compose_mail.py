#!/usr/bin/python3
"""
This module contains functions to compose mail to be sent out
"""
from mailersend import emails
from os import getenv

API_KEY = getenv("MAILERSEND_API_KEY")
EMAIL = "MS_XdcwG0@trial-o65qngkv9p8lwr12.mlsender.net"
mailer = emails.NewEmail(API_KEY)

mail_body = {}

mail_from = {
    "email": EMAIL
}


def code_mailer(user_email: str, code: str):
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

    return mailer
