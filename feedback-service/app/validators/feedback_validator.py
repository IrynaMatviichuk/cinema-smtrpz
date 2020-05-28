from cerberus import Validator


class FeedbackCreateValidator:
    def __init__(self):
        self.validator = Validator()
        self.validator.schema = {
            "score": {
                "required": True,
                "type": "integer",
                "min": 1,
                "max": 10,
            },
            "review": {
                "required": True,
                "type": "string",
                "empty": False,
                "minlength": 3,
                "maxlength": 200,
            },
            "movie_id_fk": {
                "required": True,
                "type": "integer",
            },
            "cinema_user_id_fk": {
                "required": True,
                "type": "integer",
            },
        }

    def validate(self, new_feedback):
        return self.validator.validate(new_feedback), self.validator.errors