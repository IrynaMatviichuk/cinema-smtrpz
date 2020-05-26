from flask import jsonify, request

from app import db
from app.models import Feedback
from app.feedback_service import feedback_service


@feedback_service.route("/select/all", methods=["GET"]) 
def select_all():
    all_feedbacks = [feedback.to_dict() for feedback in Feedback.query.all()]
    return jsonify(all_feedbacks)


# @feedback_service.route("/select/<int:feedback_id>", methods=["GET"])
# def select_by_id(feedback_id):
#     pass


@feedback_service.route("/select/movie/<int:movie_id>", methods=["GET"])
def select_by_movie(movie_id):
    feedback = [feedback.to_dict() for feedback in Feedback.query.filter_by(movie_id_fk=movie_id).all()]
    return jsonify(feedback)
