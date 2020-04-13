from flask import jsonify

from . import auditorium_service
from .. import db
from ..models import Auditorium


@auditorium_service.route("/select/all", methods=["GET"])
def select_all():
    all_auditoriums = [auditorium.to_dict() for auditorium in Auditorium.query.all()]
    return jsonify(all_auditoriums)


@auditorium_service.route("/get/<int:auditorium_id>", methods=["GET"])
def get_by_id(auditorium_id):
    auditorium = Auditorium.query.get_or_404(auditorium_id)
    return jsonify(auditorium.to_dict(include_seats=True))
