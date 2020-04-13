from flask import Blueprint


auditorium_service = Blueprint("auditorium", __name__)


from . import views