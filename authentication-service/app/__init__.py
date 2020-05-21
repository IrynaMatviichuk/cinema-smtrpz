from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

from config import app_config

db = SQLAlchemy()


def create_app(config_name):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(app_config[config_name])
    db.init_app(app)

    from .authentication import authentication as authentication_blueprint
    app.register_blueprint(authentication_blueprint, url_prefix="/auth")

    return app
