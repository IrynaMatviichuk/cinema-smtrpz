from cerberus import Validator


class UserLoginValidator:
    def __init__(self):
        self.validator = Validator()
        self.validator.schema = {
            "username": {
                "required": True,
                "type": "string",
                "empty": False,
            },
            "password": {
                "required": True,
                "type": "string",
                "empty": False
            },
        }

    def validate(self, user_data):
        return self.validator.validate(user_data), self.validator.errors
