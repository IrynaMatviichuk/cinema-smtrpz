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
            "password": self.password,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "is_admin": self.is_admin,
        }

    # @validates("username")
    # def validate_username(self, key, username):
    #     if len(username) < 3 or len(username) > 20:
    #         raise AssertionError("Username length must be between 3 and 20")
    #     elif not re.match(r"^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$", username):
    #         raise AssertionError("Invalid username format")

    #     return username

    # @validates("password")
    # def validate_password(self, key, password):
    #     if len(password) < 8 or len(password) > 15:
    #         raise AssertionError("Password length must be between 3 and 20")
    #     elif not re.match(r"(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9_]{6,15})$", password):
    #         raise AssertionError("Password must contain letters and numbers or _")

    # @validates("firstname")
    # def validate_firstname(self, key, firstname):
    #     if len(firstname) < 2 or len(firstname) > 20:
    #         raise AssertionError("Firstname length must be between 2 and 20")
    #     elif not re.match(r"^[a-zA-Z]{2,20}$", firstname):
    #         raise AssertionError("Firstname must contain only letters")
        
    #     return firstname

    # @validates("lastname")
    # def validate_lastname(self, key, lastname):
    #     if len(lastname) < 2 or len(lastname) > 20:
    #         raise AssertionError("Lastname length must be between 2 and 20")
    #     elif not re.match(r"^[a-zA-Z]{2,20}$", lastname):
    #         raise AssertionError("Lastname must contain only letters")
        
    #     return lastname

    def verify_password(self, password_to_check):
        return check_password_hash(self.password, password_to_check)
