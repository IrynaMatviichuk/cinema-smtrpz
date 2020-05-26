from datetime import datetime, timedelta
from functools import wraps
from json import dumps

import jwt
from flask import Response, current_app, g, jsonify, make_response, request

from app import db
from app.access import admin_access, user_access
from app.feedback_service import feedback_service
from app.models import CinemaUser, Feedback, Movie
from app.validators.feedback_validator import FeedbackCreateValidator


# @feedback_service.route("/select/all", methods=["GET"]) 
# def select_all():
#     all_feedbacks = [feedback.to_dict() for feedback in Feedback.query.all()]
#     return jsonify(all_feedbacks)


# @feedback_service.route("/select/movie/<int:movie_id>", methods=["GET"])
# def select_by_movie(movie_id):
#     feedback = [feedback.to_dict() for feedback in Feedback.query.filter_by(movie_id_fk=movie_id).all()]
#     return jsonify(feedback)


@feedback_service.route("/insert", methods=["POST"])
@user_access
def insert():
    feedback_data = request.get_json()
    is_valid, errors = FeedbackCreateValidator().validate(feedback_data)
    if not is_valid:
        return Response(dumps({
            error: ", ".join(values) for (error, values) in errors.items()
        }), status=400)

    print("\n\n\n", feedback_data)
    movie = Movie.query.get_or_404(feedback_data.get("movie_id_fk"))
    print("\n\nmovie", movie)
    cinema_user = CinemaUser.query.get_or_404(feedback_data.get("cinema_user_id_fk"))
    print("\n\nuser", cinema_user)
    feedback = Feedback(
        score=feedback_data.get("score"),
        review=feedback_data.get("review"),
        movie_id_fk=movie.movie_id,
        cinema_user_id_fk=cinema_user.cinema_user_id,
    )
    print("\n\n", feedback)

    db.session.add(feedback)
    db.session.commit()

    print("\n\nhere")

    return jsonify(feedback.to_dict())


# @feedback_service.route("/update/<int:feedback_id>", methods=["PUT"])
# def update(feedback_id):
#     pass


@feedback_service.route("/delete/<int:feedback_id>", methods=["DELETE"])
@user_access
def delete(feedback_id):
    feedback = Feedback.query.get_or_404(feedback_id)
    db.session.delete(feedback)
    db.session.commit()

    return jsonify(feedback.to_dict(use_id=True))
