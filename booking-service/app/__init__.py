from flask import Flask, jsonify
from flask_socketio import SocketIO, send
from flask_sqlalchemy import SQLAlchemy

from config import app_config


db = SQLAlchemy()
socketio = SocketIO()


def create_app(config_name):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(app_config[config_name])
    db.init_app(app)

    from .booking import booking as booking_blueprint
    app.register_blueprint(booking_blueprint, url_prefix="/book")

    socketio.init_app(app, cors_allowed_origins="*")
    return app
