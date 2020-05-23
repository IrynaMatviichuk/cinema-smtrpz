import jwt
from flask import Response, current_app, jsonify, make_response, request, g


def user_access(f):
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
        if "Authorization" in request.headers:
            token = request.headers["Authorization"]

        if not token:
            return Response(dumps({
                "general": "no token"
            }), status=401)

        try:
            data = jwt.decode(token.split(" ")[1], current_app.config["SECRET_KEY"])
            current_cinema_user = CinemaUser.query.filter_by(cinema_user_id=data.get("public_id")).first()
            if not current_cinema_user.is_admin:
                return Response(dumps({
                    "general": "no access rights"
                }), status=401)
            g.current_user = current_cinema_user.to_dict()
        except:
            return Response(dumps({
                "general": "invalid token"
            }), status=401)

        return f(*args, **kwargs)
    return decorator