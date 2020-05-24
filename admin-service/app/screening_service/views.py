from datetime import datetime, timedelta
from json import dumps

from flask import Response, jsonify, request

from app import db
from app.access import admin_access
from app.models import Auditorium, Movie, Screening
from app.screening_service import screening_service
from app.validators.screening_validator import (
    ScreeningCreateValidator,
    ScreeningUpdateValidator
)


@screening_service.route("/insert", methods=["POST"])
@admin_access
def insert():
    screening_data = request.get_json()
    is_valid, errors = ScreeningCreateValidator().validate(screening_data)
    if not is_valid:
        return Response(dumps({
            error: ", ".join(values) for (error, values) in errors.items()
        }), status=400)

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
        ).time(),
    )

    if screening.has_overlaps():
        return Response(dumps({
            "start_time": "this screening overlaps with another screening in this auditorium"
        }), status=400)
    else:
        db.session.add(screening)
        db.session.commit()
        return jsonify(screening.to_dict())


@screening_service.route("/update/<int:screening_id>", methods=["PUT"])
@admin_access
def update(screening_id):
    screening_data = request.get_json()
    is_valid, errors = ScreeningUpdateValidator().validate(screening_data)
    if not is_valid:
        return Response(dumps({
            error: ", ".join(values) for (error, values) in errors.items()
        }), status=400)

    screening = Screening.query.get_or_404(screening_id)
    movie = Movie.query.get(screening.movie_id_fk)
    screening.price = screening_data.get("price", screening.price)
    screening.screening_date = screening_data.get("screening_date", screening.screening_date.strftime("%Y-%m-%d"))
    screening.start_time = screening_data.get("start_time", screening.start_time.strftime("%H:%M:%S"))
    screening.end_time = (
        datetime.strptime(screening_data.get("start_time", screening.start_time), "%H:%M:%S") +
        timedelta(minutes=movie.duration)
    ).time()

    if screening.has_update_overlaps():
        return Response(dumps({
            "start_time": "this screening overlaps with another screening in this auditorium"
        }), status=400)
    else:
        db.session.commit()
        return jsonify(screening.to_dict())


@screening_service.route("/delete/<int:screening_id>", methods=["DELETE"])
@admin_access
def delete(screening_id):
    screening = Screening.query.get_or_404(screening_id)
    db.session.delete(screening)
    db.session.commit()

    return jsonify(screening.to_dict(use_id=True))
