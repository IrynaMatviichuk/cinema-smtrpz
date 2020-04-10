from flask import Blueprint


movie_service = Blueprint("movie", __name__)


from . import views