import datetime

from sqlalchemy.orm import validates
from werkzeug.security import check_password_hash, generate_password_hash

from app import db


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


class Movie(db.Model):
    __tablename__ = "movie"

    movie_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), unique=True, nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    genre_id_fk = db.Column(db.Integer, db.ForeignKey("genre.genre_id"), nullable=False)
    description = db.Column(db.Text, nullable=False)
    screenings = db.relationship("Screening", backref="movie", lazy=False)

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


class Auditorium(db.Model):
    __tablename__ = "auditorium"

    auditorium_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=True, nullable=False)
    screenings = db.relationship("Screening", backref="auditorium", lazy=False)
    seats = db.relationship("Seat", backref="auditorium", lazy=False)

    def __repr__(self):
        return f"<Auditorium:(auditorium_id={self.auditorium_id}, name={self.name})>"

    def to_dict(self, include_seats=False):
        return {
            "auditorium_id": self.auditorium_id,
            "name": self.name,
            "seats": [
                seat.to_dict(use_id=True) for seat in self.seats
            ] if include_seats else [],
        }


class Screening(db.Model):
    #TODO: unique constraint validation
    __tablename__ = "screening"
    __table_args__ = (
        db.UniqueConstraint("auditorium_id_fk", "screening_date", "start_time", name="unique_screening"),
    )

    screening_id = db.Column(db.Integer, primary_key=True)
    movie_id_fk = db.Column(db.Integer, db.ForeignKey("movie.movie_id"), nullable=False)
    auditorium_id_fk = db.Column(db.Integer, db.ForeignKey("auditorium.auditorium_id"), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    screening_date = db.Column(db.Date, nullable=False)
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)
    bookings = db.relationship("Booking", backref="screening", lazy=False)

    def __repr__(self):
        return (
            f"<Screening:(screening_id={self.screening_id}, movie_id_fk={self.movie_id_fk}, auditorium_id_fk={self.auditorium_id_fk}, "
            f"price={self.price}, screening_date={self.screening_date}, start_time={self.start_time}, end_time={self.end_time})>"
        )

    def to_dict(self, use_id=False):
        return {
            "screening_id": self.screening_id,
            "movie": self.movie_id_fk if use_id else self.movie.to_dict(),
            "auditorium": self.auditorium_id_fk if use_id else self.auditorium.to_dict(),
            "price": self.price,
            "screening_date": self.screening_date.strftime("%Y-%m-%d"),
            "start_time": self.start_time.strftime("%H:%M:%S"),
            "end_time": self.end_time.strftime("%H:%M:%S"),
        }


class Seat(db.Model):
    __tablename__ = "seat"

    seat_id = db.Column(db.Integer, primary_key=True)
    auditorium_id_fk = db.Column(db.Integer, db.ForeignKey("auditorium.auditorium_id"), nullable=False)
    row = db.Column(db.Integer, nullable=False)
    number = db.Column(db.Integer, nullable=False)
    bookings = db.relationship("Booking", backref="seat", lazy=False)

    def __repr__(self):
        return (
            f"<Seat: (seat_id={self.seat_id}, auditorium_id_fk={self.auditorium_id_fk}, "
            f"row={self.row}, number={self.number})>"
        )

    def to_dict(self, use_id=False):
        return {
            "seat_id": self.seat_id,
            "auditorium": self.auditorium_id_fk if use_id else self.auditorium.to_dict(),
            "row": self.row,
            "number": self.number,
        }


class CinemaUser(db.Model):
    __tablename__ = "cinema_user"

    cinema_user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    firstname = db.Column(db.String(20), nullable=False)
    lastname = db.Column(db.String(20), nullable=False)
    bookings = db.relationship("Booking", backref="cinema_user", lazy=False)
    is_admin = db.Column(db.Boolean, default=False, nullable=False)

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


class Booking(db.Model):
    __tablename__ = "booking"

    booking_id = db.Column(db.Integer, primary_key=True)
    screening_id_fk = db.Column(db.Integer, db.ForeignKey("screening.screening_id"), nullable=False)
    cinema_user_id_fk = db.Column(db.Integer, db.ForeignKey("cinema_user.cinema_user_id"), nullable=False)
    seat_id_fk = db.Column(db.Integer, db.ForeignKey("seat.seat_id"), nullable=False)
    booking_date = db.Column(db.Date, default=datetime.datetime.now().date(), nullable=False)
    booking_time = db.Column(db.Time, default=datetime.datetime.now().time(), nullable=False)

    def __init__(self, screening_id_fk, cinema_user_id_fk, seat_id_fk):
        self.screening_id_fk = screening_id_fk
        self.cinema_user_id_fk = cinema_user_id_fk
        self.seat_id_fk = seat_id_fk

    def __repr__(self):
        return (
            f"<Booking: (booking_id={self.booking_id}, screening_id_fk={self.screening_id_fk}, "
            f"cinema_user_id_fk={self.cinema_user_id_fk}, seat_id_fk={self.seat_id_fk}, "
            f"booking_date={self.booking_date}, booking_time={self.booking_time}"
        )

    def to_dict(self, use_id=False):
        return {
            "booking_id": self.booking_id,
            "screening_id_fk": self.screening_id_fk if use_id else self.screening.to_dict(),
            "cinema_user_id_fk": self.cinema_user_id_fk if use_id else self.cinema_user.to_dict(),
            "seat_id_fk": self.seat_id_fk if use_id else self.seat.to_dict(),
            "booking_date": self.booking_date.strftime("%Y-%m-%d"),
            "booking_time": self.booking_time.strftime("%H:%M:%S"),
        }

    def seat_in_auditorium(self):
        return self.seat.auditorium_id_fk == self.screening.auditorium_id_fk

    @validates("cinema_user_id_fk")
    def validate_cinema_user(self, key, cinema_user_id_fk):
        if CinemaUser.query.filter_by(cinema_user_id=cinema_user_id_fk).first().is_admin:
            raise AssertionError("Admin can't book screenings")

        return cinema_user_id_fk
