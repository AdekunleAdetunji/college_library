#!/usr/bin/python3
"""
This module contains functions to compose mail to be sent out
"""
from mailersend import emails
from os import getenv

API_KEY = getenv("MAILERSEND_API_KEY")
EMAIL = "info@projectmonty.tech"
mailer = emails.NewEmail(API_KEY)

mail_body = {}

mail_from = {
    "from": "College Library",
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

    template_id = "jy7zpl9jo9og5vx6"
    mailer.set_mail_from(mail_from, mail_body)
    mailer.set_mail_to(recipient, mail_body)
    mailer.set_subject("Email Verification", mail_body)
    mailer.set_template(template_id, mail_body)
    mailer.set_advanced_personalization(personalization, mail_body)

    return mailer
