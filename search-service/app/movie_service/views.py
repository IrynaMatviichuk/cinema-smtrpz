from flask import jsonify, request

from app import db
from app.movie_service import movie_service
from app.models import Movie


@movie_service.route("/select/all", methods=["GET"])
def select_all():
    all_movies = [movie.to_dict() for movie in Movie.query.all()]
    return jsonify(all_movies)


@movie_service.route("/get/<int:movie_id>", methods=["GET"])
def get_by_id(movie_id):
    movie = Movie.query.get_or_404(movie_id)
    return jsonify(movie.to_dict())
