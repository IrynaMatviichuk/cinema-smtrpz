from flask import jsonify

from . import genre_service
from .. import db
from ..models import Genre


@genre_service.route("/select/all", methods=["GET"])
def select_all():
    all_genres = [genre.to_dict() for genre in Genre.query.all()]
    return jsonify(all_genres)