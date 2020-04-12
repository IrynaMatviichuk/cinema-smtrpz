from datetime import datetime, timedelta

from flask import jsonify, request

from . import screening_service
from .. import db
from ..models import Screening, Movie, Auditorium


@screening_service.route("/select/all", methods=["GET"])
def select_all():
    all_screenings = [screening.to_dict() for screening in Screening.query.all()]
    return jsonify(all_screenings)


@screening_service.route("/insert", methods=["POST"])
def insert():
    screening_data = request.get_json()
    movie = Movie.query.get_or_404(screening_data.get("movie_id_fk"))
    auditorium = Auditorium.query.get_or_404(screening_data.get("auditorium_id_fk"))
    screening = Screening(
        movie_id_fk=movie.movie_id,
        auditorium_id_fk=auditorium.auditorium_id,
        price=screening_data.get("price"),
        screening_date=screening_data.get("screening_date"),
        start_time=screening_data.get("start_time"),
        end_time = (
            datetime.strptime(screening_data.get("start_time"), "%H:%M:%S") + 
            timedelta(minutes=movie.duration)
        ),
    )
    db.session.add(screening)
    db.session.commit()

    return jsonify(screening.to_dict())


@screening_service.route("/update/<int:screening_id>", methods=["POST"])
def update(screening_id):
    screening_data = request.get_json()
    screening = Screening.query.get_or_404(screening_id)
    movie = Movie.query.get(screening.movie_id_fk)
    screening.price = screening_data.get("price", screening.price)
    screening.screening_date = screening_data.get("screening_date", screening.screening_date.strftime("%Y-%m-%d"))
    screening.start_time = screening_data.get("start_time", screening.start_time.strftime("%H:%M:S"))
    screening.end_time = (
        datetime.strptime(screening_data.get("start_time"), "%H:%M:%S") + 
        timedelta(minutes=movie.duration)
    )
    db.session.commit()

    return jsonify(screening.to_dict())


@screening_service.route("/delete/<int:screening_id>", methods=["GET"])
def delete(screening_id):
    screening = Screening.query.get_or_404(screening_id)
    db.session.delete(screening)
    db.session.commit()

    return jsonify(screening.to_dict(use_id=True))