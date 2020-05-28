from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

from config import app_config


db = SQLAlchemy()


def create_app(config_name):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(app_config[config_name])
    db.init_app(app)

    from .booking import booking as booking_blueprint
    app.register_blueprint(booking_blueprint, url_prefix="/book")

    @app.route("/url/map", methods=["GET"])
    def url_map():
        endpoints = [(rule.endpoint, list(rule.methods), str(rule)) for rule in app.url_map.iter_rules()]
        return jsonify(endpoints)

    return app
