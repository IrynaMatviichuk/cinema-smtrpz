from flask import jsonify, request

from . import screening_service
from .. import db
from ..models import Screening


@screening_service.route("/select/all", methods=["GET"])
def select_all():
    all_screenings = [screening.to_dict() for screening in Screening.query.all()]
    return jsonify(all_screenings)


@screening_service.route("/insert", methods=["POST"])
def insert():
    screening_data = request.get_json()
    screening = Screening(
        movie_id_fk=screening_data.get("movie_id_fk"),
        auditorium_id_fk=screening_data.get("auditorium_id_fk"),
        price=screening_data.get("price"),
        screening_date=screening_data.get("screening_date"),
        start_time=screening_data.get("start_time"),
    )
    db.session.add(screening)
    db.session.commit()

    return jsonify(screening.to_dict())


@screening_service.route("/update/<int:screening_id>", methods=["POST"])
def update(screening_id):
    screening_data = request.get_json()
    screening = Screening.query.get_or_404(screening_id)
    screening.price = screening_data.get("price", screening.price)
    screening.screening_date = screening_data.get("screening_date", screening.screening_date)
    screening.start_time = screening_data.get("start_time", screening.start_time)
    db.session.commit()

    return jsonify(screening.to_dict())


@screening_service.route("/delete/<int:screening_id>", methods=["GET"])
def delete(screening_id):
    screening = Screening.query.get_or_404(screening_id)
    db.session.delete(screening)
    db.session.commit()

    return jsonify(screening.to_dict(use_id=True))