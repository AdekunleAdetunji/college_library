#!/usr/bin/python3
"""
This module contains a fuction for generating a random code
"""
import string
import secrets

async def gen_random_code():
    """function to handle generation of random"""
    code = "".join(secrets.choice(string.digits) for i in range(6))
    return code
