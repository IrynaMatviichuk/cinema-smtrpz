from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import validates

from app import db


class Movie(db.Model):
    __tablename__ = "movie"

    movie_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), unique=True, nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    genre = db.Column(db.Integer, nullable=False)
    screenings = db.relationship("Screening", backref="movie", lazy=False)

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
            # "screenings": [
            #     screening.to_dict() for screening in self.screenings
            # ],
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


class Auditorium(db.Model):
    #TODO: check validation
    __tablename__ = "auditorium"

    auditorium_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=True, nullable=False)
    screenings = db.relationship("Screening", backref="auditorium", lazy=False)

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f"<Auditorium:(auditorium_id={self.auditorium_id}, name={self.name})>"

    def to_dict(self):
        return {
            "auditorium_id": self.auditorium_id,
            "name": self.name,
            # "screenings": [
            #     screening.to_dict() for screening in self.screenings
            # ],
        }

    @validates("name")
    def validate_title(self, key, name):
        if Movie.query.filter(Auditorium.name == name).first():
            raise AssertionError("Auditorium with such title already exists")

        if len(name) < 3 or len(name)> 30:
            raise AssertionError("Auditorium name must be between 3 and 30 characters")

        return name


class Screening(db.Model):
    #TODO: add validation
    __tablename__ = "screening"

    screening_id = db.Column(db.Integer, primary_key=True)
    movie_id_fk = db.Column(db.Integer, db.ForeignKey("movie.movie_id"), nullable=False)
    auditorium_id_fk = db.Column(db.Integer, db.ForeignKey("auditorium.auditorium_id"), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    screening_date = db.Column(db.Date, nullable=False)
    start_time = db.Column(db.Time, nullable=False)

    def __init__(self, movie_id_fk, auditorium_id_fk, price, screening_date, start_time):
        self.movie_id_fk = movie_id_fk
        self.auditorium_id_fk = auditorium_id_fk
        self.price = price
        self.screening_date = screening_date
        self.start_time = start_time

    def __repr__(self):
        return (
            f"<Screening:(screening_id={self.screening_id}, movie_id_fk={self.movie_id_fk}, auditorium_id_fk={self.auditorium_id_fk}, "
            f"price={self.price}, screening_date={self.screening_date}, start_time={self.start_time})>"
        )

    def to_dict(self, use_id=False):
        return {
            "screening_id": self.screening_id,
            "movie": self.movie_id_fk if use_id else self.movie.to_dict(),
            "auditorium": self.auditorium_id_fk if use_id else self.auditorium.to_dict(),
            "price": self.price,
            "screening_date": self.screening_date.strftime("%Y-%m-%d"),
            "start_time": self.start_time.strftime("%H:%M:%S"),
        }