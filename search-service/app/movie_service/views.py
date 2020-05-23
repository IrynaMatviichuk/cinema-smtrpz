from flask import jsonify, request

from . import movie_service
from .. import db
from ..models import Genre, Movie


@movie_service.route("/select/all", methods=["GET"])
def select_all():
    all_movies = [movie.to_dict() for movie in Movie.query.all()]
    return jsonify(all_movies)


@movie_service.route("/insert", methods=["POST"])
def insert():
    movie_data = request.get_json()
    genre = Genre.query.get_or_404(movie_data.get("genre_id_fk"))
    movie = Movie(
        title=movie_data.get("title"),
        duration=movie_data.get("duration"),
        genre_id_fk=genre.genre_id,
        description=movie_data.get("description"),
    )
    db.session.add(movie)
    db.session.commit()

    return jsonify(movie.to_dict())


@movie_service.route("/update/<int:movie_id>", methods=["POST"])
def update(movie_id):
    movie_data = request.get_json()
    movie = Movie.query.get_or_404(movie_id)
    movie.duration = movie_data.get("duration", movie.duration)
    # movie.genre = movie_data.get("genre", movie.genre)
    db.session.commit()

    return jsonify(movie.to_dict())


@movie_service.route("/delete/<int:movie_id>", methods=["GET"])
def delete(movie_id):
    movie = Movie.query.get_or_404(movie_id)
    db.session.delete(movie)
    db.session.commit()

    return jsonify(movie.to_dict(use_id=True))

