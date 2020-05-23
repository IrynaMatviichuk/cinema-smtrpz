from cerberus import Validator


class MovieCreateValidator:
    def __init__(self):
        self.validator = Validator()
        self.validator.schema = {
            "title": {
                "required": True,
                "type": "string",
                "empty": False,
                "minlength": 3,
                "maxlength": 50,
            },
            "duration": {
                "required": True,
                "type": "integer",
                "empty": False,
                "min": 60,
                "max": 240,
            },
            "genre_id_fk": {
                "required": True,
                "type": "integer",
            },
            "description": {
                "required": True,
                "type": "string",
                "empty": False,
                "minlength": 3,
                "maxlength": 200,
            },
        }

    def validate(self, new_movie):
        return self.validator.validate(new_movie), self.validator.errors


class MovieUpdateValidator:
    def __init__(self):
        self.validator = Validator()
        self.validator.schema = {
            "title": {
                "required": False,
                "type": "string",
                "empty": False,
                "minlength": 3,
                "maxlength": 50,
            },
            "duration": {
                "required": False,
                "type": "integer",
                "empty": False,
                "min": 60,
                "max": 240,
            },
            "genre_id_fk": {
                "required": False,
                "type": "integer",
            },
            "description": {
                "required": False,
                "type": "string",
                "empty": False,
                "minlength": 3,
                "maxlength": 200,
            },
        }

    def validate(self, new_movie):
        return self.validator.validate(new_movie), self.validator.errors