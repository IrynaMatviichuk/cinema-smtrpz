from flask import Blueprint


booking_service = Blueprint("booking", __name__)


from . import views