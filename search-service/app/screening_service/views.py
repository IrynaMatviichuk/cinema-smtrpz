from datetime import datetime, timedelta

from flask import jsonify, request

from app import db
from app.models import Screening
from app.screening_service import screening_service


@screening_service.route("/select/all", methods=["GET"])
def select_all():
    all_screenings = [screening.to_dict() for screening in Screening.query.all()]
    return jsonify(all_screenings)


@screening_service.route("/get/<int:screening_id>", methods=["GET"])
def get_by_id(screening_id):
    screening = Screening.query.get_or_404(screening_id)
    return jsonify(screening.to_dict())
