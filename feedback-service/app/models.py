import datetime

from sqlalchemy.orm import validates
from werkzeug.security import check_password_hash, generate_password_hash

from app import db


class Feedback(db.Model):
    __tablename__ = "feedback"

    feedback_id = db.Column(db.Integer, primary_key=True)
    score = db.Column(db.Integer, nullable=False)
    review = db.Column(db.Text, nullable=False)
    feedback_date = db.Column(db.Date, default=datetime.datetime.now().date(), nullable=False)
    feedback_time = db.Column(db.Time, default=datetime.datetime.now().time(), nullable=False)
    movie_id_fk = db.Column(db.Integer, db.ForeignKey("movie.movie_id"), nullable=False)
    cinema_user_id_fk = db.Column(db.Integer, db.ForeignKey("cinema_user.cinema_user_id"), nullable=False)

    def __repr__(self):
        return (
            f"<Feedback: (feedback_id={self.feedback_id}, "
            f"score={self.score}, review={self.review}, "
            f"feedback_date={self.feedback_date}, feedback_time={self.feedback_time}, movie_id_fk={self.movie_id_fk}, cinema_user_id_fk={self.cinema_user_id_fk})>"
        )

    def to_dict(self, use_id=False):
        return {
            "feedback_id": self.feedback_id,
            "score": self.score,
            "review": self.review,
            "feedback_date": self.feedback_date.strftime("%Y-%m-%d"),
            "feedback_time": self.feedback_time.strftime("%H:%M:%S"),
            "movie_id_fk": self.movie_id_fk if use_id else self.movie.to_dict(),
            "cinema_user_id_fk": self.cinema_user_id_fk if use_id else self.cinema_user.to_dict(),
        }


class Movie(db.Model):
    __tablename__ = "movie"

    movie_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), unique=True, nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    genre_id_fk = db.Column(db.Integer, db.ForeignKey("genre.genre_id"), nullable=False)
    description = db.Column(db.Text, nullable=False)
    feedbacks = db.relationship("Feedback", backref="movie", lazy=False)

    def __init__(self, title, duration, genre_id_fk, description):
        self.title = title
        self.duration = duration
        self.genre_id_fk = genre_id_fk
        self.description = description

    def __repr__(self):
        return (
            f"<Movie:(movie_id={self.movie_id}, title={self.title}, duration={self.duration}, "
            f"genre={self.genre_if_fk}, description={self.description})>"
        )

    def to_dict(self):
        return {
            "movie_id": self.movie_id,
            "title": self.title,
            "duration": self.duration,
            "genre": self.genre.to_dict(),
            "description": self.description
        }


class CinemaUser(db.Model):
    __tablename__ = "cinema_user"

    cinema_user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    firstname = db.Column(db.String(20), nullable=False)
    lastname = db.Column(db.String(20), nullable=False)
    is_admin = db.Column(db.Boolean, default=False, nullable=False)
    feedbacks = db.relationship("Feedback", backref="cinema_user", lazy=False)

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


class Genre(db.Model):
    __tablename__ = "genre"

    genre_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=True, nullable=False)
    movies = db.relationship("Movie", backref="genre", lazy=False)

    def __repr__(self):
        return f"<Genre: (genre_id={self.genre_id}, name={self.name})>"

    def to_dict(self):
        return {
            "genre_id": self.genre_id,
            "name": self.name,
        }
