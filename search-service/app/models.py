from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import validates

from app import db


class Movie(db.Model):
    __tablename__ = "movie"

    movie_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), unique=True, nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    genre = db.Column(db.Integer, nullable=False)

    def __init__(self, title, duration, genre):
        self.title = title
        self.duration = duration
        self.genre = genre

    def __repr__(self):
        return (
            f"<Movie:(movie_id={self.movie_id}, title={self.title}, "
            f"duration={self.duration}, genre={self.duration})>"
        )

    def to_dict(self):
        return {
            "movie_id": self.movie_id,
            "title": self.title,
            "duration": self.duration,
            "genre": self.genre,
        }

    @validates("title")
    def validate_title(self, key, title):
        if Movie.query.filter(Movie.title == title).first():
            raise AssertionError("Movie with such title already exists")

        if len(title) < 3 or len(title)> 50:
            raise AssertionError("Movie title must be between 3 and 50 characters")

        return title

    @validates("duration")
    def validate_duration(self, key, duration):
        if duration < 60 or duration > 240:
            raise AssertionError("Duration must be between 60 and 240 minutes")

        return duration

    @validates("genre")
    def validate_genre(self, key, genre):
        if genre not in ["fantasy", "adventures", "comdey", "action", "drama"]:
            raise AssertionError("No such movie genre")

        return genre
