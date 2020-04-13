from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

from config import app_config


db = SQLAlchemy()


def create_app(config_name):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(app_config[config_name])
    db.init_app(app)

    from .genre_service import genre_service as genre_service_blueprint
    app.register_blueprint(genre_service_blueprint, url_prefix="/genre")

    from .movie_service import movie_service as movie_service_blueprint
    app.register_blueprint(movie_service_blueprint, url_prefix="/movie")

    from .screening_service import screening_service as screening_service_blueprint
    app.register_blueprint(screening_service_blueprint, url_prefix="/screening")

    from .auditorium_service import auditorium_service as auditorium_service_blueprint
    app.register_blueprint(auditorium_service_blueprint, url_prefix="/auditorium")

    from .booking_service import booking_service as booking_service_blueprint
    app.register_blueprint(booking_service_blueprint, url_prefix="/booking")

    return app
