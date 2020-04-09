from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from config import app_config

db = SQLAlchemy()


def create_app(config_name):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(app_config[config_name])
    db.init_app(app)

    from .movie_service import movie_service as movie_service_blueprint
    app.register_blueprint(movie_service_blueprint, url_prefix="/movie")

    return app
