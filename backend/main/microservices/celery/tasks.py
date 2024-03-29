#!/usr/bin/python3
"""
This module contains celery tasks function definitions
"""
import json
from .app import app
from .env import release_duration
from .env import reserve_duration
from ..compose_mail import mail_body
from ..compose_mail import code_mailer
from ..gen_code import gen_random_code
from ...cursor.cursor import Cursor
from ...schemas.book import Book
from ...schemas.borrow import Borrow
from ...schemas.faculty import Faculty
from ...schemas.librarian import Librarian
from ...schemas.school import School
from ...schemas.user import User
from datetime import datetime
from datetime import timedelta
from redis import Redis


@app.task(bind=True, max_retries=2, default_retry_delay=1,)
def send_code(self, user_dict: dict):
    """task manager for sending mail"""
    user_email = user_dict["email"]
    code = gen_random_code()
    mailer = code_mailer(user_email, code)
    try:
        res = mailer.send(mail_body)
        if not res.startswith("202"):
            print(res)
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


@app.task
def reserve_book(user_uni_id: str, book_id: str):
    """task manager to reserve book"""
    expire_delta = datetime.now() + reserve_duration
    expire_delta_str = expire_delta.isoformat()
    book_info = {book_id: expire_delta_str}

    with Redis() as red_cursor:
        reserves_json = red_cursor.get("reserves")
        if reserves_json:
            reserves = json.loads(reserves_json)
        else:
            reserves = {}

        user_reserves = reserves.get(user_uni_id)
        if user_reserves:
            user_reserves.update(book_info)
            reserves[user_uni_id] = user_reserves

        else:
            user_reserves = {user_uni_id: book_info}
            reserves.update(user_reserves)
        reserves_json = json.dumps(reserves)
        red_cursor.set("reserves", reserves_json)

    lib_cursor = Cursor()
    book = lib_cursor.get(Book, book_id)
    book.quantity = book.quantity - 1

    lib_cursor.save()
    lib_cursor.close()

    return True


@app.task
def check_reserves():
    """
    a task scheduled to check reserves for expired books
    if book is expired, return it back to the database and add the borrower
    to blacklist, else do nothing
    """
    expired_books = []
    with Redis() as red_cursor:
        blacklists_json = red_cursor.get("blacklists")
        if blacklists_json:
            blacklists = json.loads(blacklists_json)
        else:
            blacklists = {}

        reserves_json = red_cursor.get("reserves")
        if reserves_json:
            reserves_in_db = json.loads(reserves_json)
        else:
            reserves_in_db = {}
        reserves = reserves_in_db.copy()

        for user_id, user_reserves_in_db in reserves.items():
            user_reserves = user_reserves_in_db.copy()
            for book_id, expire_delta_str in user_reserves.items():
                expire_delta = datetime.fromisoformat(expire_delta_str)
                release_delta = datetime.now() + release_duration
                release_delta = release_delta.isoformat()
                if datetime.now() > expire_delta:
                    user_books_in_blacklist = blacklists.get(user_id)
                    if user_books_in_blacklist:
                        user_books_in_blacklist.update({
                            book_id: release_delta
                            })
                        blacklists[user_id] = user_books_in_blacklist
                    else:
                        user_in_blacklist = {user_id: {book_id: release_delta}}
                        blacklists.update(user_in_blacklist)
                    expired_books.append(book_id)
                    user_reserves_in_db.pop(book_id)
            reserves_in_db.update({user_id: user_reserves_in_db})
            if not reserves_in_db.get(user_id):
                reserves_in_db.pop(user_id)

        blacklists_json = json.dumps(blacklists)
        red_cursor.set("blacklists", blacklists_json)
        reserves_json = json.dumps(reserves_in_db)
        red_cursor.set("reserves", reserves_json)

    for book_id in expired_books:
        lib_cursor = Cursor()
        book_in_db = lib_cursor.get_by_uuid(Book, book_id)
        book_in_db.quantity += 1
        lib_cursor.save()
        lib_cursor.close()

    return True


@app.task
def whitelist():
    """
    a task scheduled to check the blacklists for user that are due for
    release
    """
    with Redis() as red_cursor:
        blacklists_json = red_cursor.get("blacklists")
        if blacklists_json:
            red_blacklists = json.loads(blacklists_json)
        else:
            red_blacklists = {}
        blacklists = red_blacklists.copy()

        for user_id, user_books_blacklist in blacklists.items():
            books_blacklisted = user_books_blacklist.copy()
            for book_id, release_delta in books_blacklisted.items():
                release_delta = datetime.fromisoformat(release_delta)
                if datetime.now() > release_delta:
                    user_books_blacklist.pop(book_id)
                    red_blacklists.update({user_id: user_books_blacklist})

            if not red_blacklists.get(user_id):
                red_blacklists.pop(user_id)

        red_blacklists = json.dumps(red_blacklists)
        red_cursor.set("blacklists", red_blacklists)

        return True


@app.task
def sync_faculty():
    """task to update library faculties with schools in university"""
    lib_cursor = Cursor()
    uni_cursor = Cursor("university")
    for school in uni_cursor.all(School):
        if not lib_cursor.get(Faculty, school.uni_id):
            school_dict = school.__dict__
            school_dict.pop("_sa_instance_state")
            lib_cursor.new(Faculty, **school_dict)

    lib_cursor.save()
    lib_cursor.close()

    return True


@app.task
def approve_borrow(lib_id: str, user_id: str, book_id: str):
    """task to update the borrows table for a new book borrow"""
    with Redis() as red_cursor:
        reserves = red_cursor.get("reserves")
        reserves = json.loads(reserves)
        user_reserves = reserves.get(user_id)
        user_reserves.pop(book_id)
        if user_reserves:
            reserves[user_id] = user_reserves
        else:
            reserves.pop(user_id)
        reserves = json.dumps(reserves)
        red_cursor.set("reserves", reserves)

    lib_cursor: Cursor = Cursor()

    book = lib_cursor.get(Book, book_id)
    librarian = lib_cursor.get(Librarian, lib_id)
    user = lib_cursor.get(User, user_id)

    kwargs = {"user_uuid": user.id, "book_uuid": book.id,
              "librarian_uuid": librarian.id,
              "expire_time": datetime.now() + timedelta(weeks=3)}
    borrow_obj = lib_cursor.new(Borrow, **kwargs)

    book.borrows.append(borrow_obj)
    librarian.borrows.append(borrow_obj)
    user.borrows.append(borrow_obj)

    lib_cursor.save()
    lib_cursor.close()

    return True
