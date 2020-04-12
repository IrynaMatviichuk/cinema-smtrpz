from flask import Blueprint


genre_service = Blueprint("genre", __name__)


from . import views