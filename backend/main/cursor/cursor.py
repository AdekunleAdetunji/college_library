#!/usr/bin/python3
"""
This module contains the database cursor for establishing connection with the
database
"""
from .base import Base
from os import getenv
from sqlalchemy import create_engine
from sqlalchemy_utils import force_auto_coercion
from sqlalchemy.orm import Session


class Cursor():
    """Class to control interaction with tables in the database"""
    __db_role = getenv("ROLE")
    __password = getenv("PASSWORD")
    __host = getenv("HOST")
    __port = getenv("PORT")
    __database = getenv("DATABASE")

    def __init__(self, db=""):
        """Initialize a new cursor instance"""
        force_auto_coercion()
        if db:
            self.__database = db

    def reload(self):
        """update the current pointer to reflect changes in the database"""
        #self.__session = Session(bind=self.__engine, expire_on_commit=False)
        Base.metadata.create_all(bind=self.__engine)
        self.__session = Session(bind=self.__engine, expire_on_commit=False)

    def save(self):
        """save an in memory cursor changes to the database"""
        self.__session.commit()
        self.reload()

    def new(self, obj_table, *args, **kwargs):
        """add an item to a table"""
        new_obj = obj_table(**kwargs)
        self.__session.add(new_obj)
        #self.save()
        #return self.get_by_uuid(obj_table, id=new_obj.id)
        return new_obj

    def all(self, obj_table):
        """get all the items in a table"""
        objs = self.__session.query(obj_table).all()
        return objs

    def get(self, obj_table, uni_id):
        """get a university personnel using its university id"""
        obj = self.__session.query(obj_table).filter_by(uni_id=uni_id).first()
        return obj
    
    def get_by_name(self, obj_table, names: dict = {}):
        """get a database table row by name"""
        obj = self.__session.query(obj_table).filter_by(**names).first()
        return obj

    def get_by_uuid(self, obj_table, id):
        """get a university personnel using its university id"""
        obj = self.__session.query(obj_table).filter_by(id=id).first()
        return obj

    def update(self, obj_table, id, *args, **kwargs):
        """update a table entry with given id"""
        obj = self.get(obj_table=obj_table, id=id)
        for k, v in kwargs.items():
            if hasattr(obj, k) and k not in ["updated_at", "created_at", "id"]:
                setattr(obj, k, v)
        self.save()
        return self.get(obj_table, id)

    def delete(self, obj_table, id):
        """delete an entry with a given id from a table"""
        obj = self.get(obj_table, id)
        self.__session.delete(obj)
        self.save()
        return self.get(obj_table, id)

    def close(self):
        """terminate connection to the database"""
        self.__session.close()

    def __call__(self):
        """
        logic to be executed when the cursor object is passed as a dependency
        """
        try:
            url_str = (f"postgresql+psycopg2://{self.__db_role}:"
                       f"{self.__password}@{self.__host}:{self.__port}/"
                       f"{self.__database}")
            self.__url = url_str
            self.__engine = create_engine(url=self.__url, echo=False)
            self.reload()
            yield self
        finally:
            self.close()
