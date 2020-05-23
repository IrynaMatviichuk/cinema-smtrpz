from flask import Blueprint


feedback_service = Blueprint("feedback", __name__)


from . import views