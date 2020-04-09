from flask import Blueprint


movie_service = Blueprint("search", __name__)


from . import views