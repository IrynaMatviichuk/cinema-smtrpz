import re

from sqlalchemy.orm import validates
from werkzeug.security import check_password_hash, generate_password_hash

from app import db


class CinemaUser(db.Model):
    __tablename__ = "cinema_user"

    cinema_user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    firstname = db.Column(db.String(20), nullable=False)
    lastname = db.Column(db.String(20), nullable=False)
    is_admin = db.Column(db.Boolean, nullable=False)

    def __init__(self, username, password, firstname, lastname, is_admin):
        self.username = username
        self.password = generate_password_hash(password)
        self.firstname = firstname
        self.lastname = lastname
        self.is_admin = is_admin

    def __repr__(self):
        return (
            f"<CinemaUser: (cinema_user_id={self.cinema_user_id}, "
            f"username={self.username}, password={self.password}, "
            f"firstname={self.firstname}, lastname={self.lastname}, is_admin={self.is_admin})>"
        )

    def to_dict(self):
        return {
            "cinema_user_id": self.cinema_user_id,
            "username": self.username,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "is_admin": self.is_admin,
        }


    def verify_password(self, password_to_check):
        return check_password_hash(self.password, password_to_check)
