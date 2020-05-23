from flask import jsonify

from app import db
from app.genre_service import genre_service
from app.models import Genre


@genre_service.route("/select/all", methods=["GET"])
def select_all():
    all_genres = [genre.to_dict() for genre in Genre.query.all()]
    return jsonify(all_genres)
