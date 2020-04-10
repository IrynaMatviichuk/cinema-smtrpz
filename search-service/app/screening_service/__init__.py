from flask import Blueprint


screening_service = Blueprint("screening", __name__)


from . import views