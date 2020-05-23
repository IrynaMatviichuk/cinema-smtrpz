from datetime import datetime, timedelta
from functools import wraps
from json import dumps

import jwt
from flask import Response, current_app, g, jsonify, make_response, request

from app import db
from app.authentication import authentication
from app.models import CinemaUser
from app.validators.user_login_validator import UserLoginValidator
from app.validators.user_registration_validator import UserRegistrationValidator
from config import Config


def login_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            token = request.headers["Authorization"]

        if not token:
            return Response(dumps({
                "general": "no token"
            }), status=401)

        try:
            data = jwt.decode(token.split(" ")[1], current_app.config["SECRET_KEY"])
            current_cinema_user = CinemaUser.query.filter_by(cinema_user_id=data.get("public_id")).first()
            g.current_user = current_cinema_user.to_dict()
        except:
            return Response(dumps({
                "general": "invalid token"
            }), status=401)

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


@authentication.route("/register", methods=["POST"])
def register():
    auth_data = request.get_json()
    is_valid, errors = UserRegistrationValidator().validate(auth_data)
    if not is_valid:
        return Response(dumps({error: ", ".join(values) for (error, values) in errors.items()}), status=400)

    cinema_user = CinemaUser(
        username=auth_data.get("username"),
        password=auth_data.get("password"),
        firstname=auth_data.get("firstname"),
        lastname=auth_data.get("lastname"),
        is_admin=False,
    )

    db.session.add(cinema_user)
    db.session.commit()

    token = jwt.encode({
        "public_id": cinema_user.cinema_user_id,
        "exp": datetime.utcnow() + timedelta(minutes=int(Config.TOKEN_EXP)),
    }, current_app.config["SECRET_KEY"])

    return  Response(dumps({
        "message": "registered successfully",
        "token": token.decode("UTF-8")
    }), status=200)


@authentication.route("/login", methods=["POST"])
def login():
    login_data = request.get_json()
    is_valid, errors = UserLoginValidator().validate(login_data)
    if not is_valid:
        return Response(dumps({error: ", ".join(values) for (error, values) in errors.items()}), status=400)

    cinema_user = CinemaUser.query.filter_by(username=login_data.get("username")).first()

    if cinema_user is None:
        return Response(dumps({"username": "no user with such username"}), status=401)

    if cinema_user.verify_password(login_data.get("password")):
        token = jwt.encode({
            "public_id": cinema_user.cinema_user_id,
            "exp": datetime.utcnow() + timedelta(minutes=int(Config.TOKEN_EXP)),
        }, current_app.config["SECRET_KEY"])

        return  Response(dumps({
            "message": "logined successfully",
            "token": token.decode("UTF-8")
        }), status=200)
    else:
        return Response(dumps({
            "general": "invalid credentials"
        }), status=401)


@authentication.route("/user", methods=["GET"])
@login_required
def get_user():
    return Response(dumps(g.current_user), status=200)
