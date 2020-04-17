from flask import jsonify, request, make_response, current_app
from functools import wraps
import jwt

from .models import CinemaUser


def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if "x-access-tokens" in request.headers:
            token = request.headers["x-access-tokens"]

        if not token:
            return jsonify({
                "messane": "token is missing"
            })

        try:
            data = jwt.decode(token, current_app.config["SECRET_KEY"])
            current_cinema_user = CinemaUser.query.filter_by(cinema_user_id=data.get("public_id")).first()
        except:
            return jsonify({
                "message": "token is invalid"
            })

        return f(*args, **kwargs)
    return decorator


def admin_access(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if "x-access-tokens" in request.headers:
            token = request.headers["x-access-tokens"]

        if not token:
            return jsonify({"messane": "token is missing"})

        try:
            data = jwt.decode(token, current_app.config["SECRET_KEY"])
            current_cinema_user = CinemaUser.query.filter_by(cinema_user_id=data.get("public_id")).first()
        except:
            return jsonify({"message": "token is invalid"})

        if not current_cinema_user.is_admin:
            return jsonify({"message": "not enough rights"})

        return f(*args, **kwargs)
    return decorator