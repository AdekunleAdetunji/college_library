#!/usr/bin/python3
""" The basemodel module containing the basemodel class of all tables"""
from uuid import uuid4
from datetime import datetime
from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import UUID


class Basemodel():
    """The base class for all tables"""
    id = Column(UUID, nullable=False, primary_key=True, default=uuid4())
    created_at = Column(DateTime, nullable=False, default=datetime.now())
    updated_at = Column(DateTime, nullable=False, default=datetime.now())

    def __init__(self, *args, **kwargs) -> None:
        """Initialize a new table entry"""
        for k, v in kwargs.items():
            if hasattr(self, k) and k not in ["created_at", "updated_at",
                                              "id"]:
                setattr(self,  k, v)

    def to_dict(self):
        """return a dictionary representation of the table entry"""
        dict_rep = self.__dict__.copy()
        dict_rep.pop("_sa_instance_state")
        dict_rep["created_at"] = dict_rep["created_at"].strftime(
            "%Y-%m-%dT%H:%M:%S"
        )
        dict_rep["updated_at"] = dict_rep["updated_at"].strftime(
            "%Y-%m-%dT%H:%M:%S"
        )
        return dict_rep

    def __repr__(self) -> str:
        """an unambigous string representation of the instance"""
        return f"{type(self).__name__}({self.to_dict()})"

    def __str__(self) -> str:
        """human readable representation of the table entry"""
        return f"{type(self).__name__}({self.to_dict()})"
