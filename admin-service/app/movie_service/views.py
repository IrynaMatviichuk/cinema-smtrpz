from functools import wraps
from json import dumps

from flask import Response, jsonify, request

from app import db
from app.access import admin_access
from app.models import CinemaUser, Genre, Movie
from app.movie_service import movie_service
from app.validators.movie_validator import (
    MovieCreateValidator,
    MovieUpdateValidator
)


@movie_service.route("/insert", methods=["POST"])
@admin_access
def insert():
    movie_data = request.get_json()
    is_valid, errors = MovieCreateValidator().validate(movie_data)
    if not is_valid:
        return Response(dumps({
            error: ", ".join(values) for (error, values) in errors.items()
        }), status=400)

    if Movie.query.filter_by(title=movie_data.get("title")).all():
        return Response(dumps({
            "title": "title already exists"
        }), status=400)

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



@movie_service.route("/update/<int:movie_id>", methods=["PUT"])
@admin_access
def update(movie_id):
    movie_data = request.get_json()
    is_valid, errors = MovieUpdateValidator().validate(movie_data)
    if not is_valid:
        return Response(dumps({
            error: ", ".join(values) for (error, values) in errors.items()
        }), status=400)
    
    movie = Movie.query.get_or_404(movie_id)
    movie.duration = movie_data.get("duration", movie.duration)
    movie.description = movie_data.get("description", movie.description)
    db.session.commit()

    return jsonify(movie.to_dict())


@movie_service.route("/delete/<int:movie_id>", methods=["DELETE"])
@admin_access
def delete(movie_id):
    movie = Movie.query.get_or_404(movie_id)
    db.session.delete(movie)
    db.session.commit()

    return jsonify(movie.to_dict(use_id=True))
