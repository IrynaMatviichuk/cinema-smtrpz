from flask import Blueprint


authentication = Blueprint("authentication", __name__)


from . import views