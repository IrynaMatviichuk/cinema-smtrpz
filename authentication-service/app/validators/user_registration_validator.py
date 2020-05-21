from cerberus import Validator


class UserRegistrationValidator:
    def __init__(self):
        self.validator = Validator()
        self.validator.schema = {
            "username": {
                "required": True,
                "type": "string",
                "empty": False,
                "minlength": 3,
                "maxlength": 20,
                "regex": "^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$"
            },
            "password": {
                "required": True,
                "type": "string",
                "empty": False
            },
            "confirmPassword": {
                "required": True,
                "type": "string",
                "empty": False,
                "minlength": 8,
                "maxlength": 20,
            },
            "firstname": {
                "required": True,
                "type": "string",
                "empty": False,
                "minlength": 2,
                "maxlength": 20,
                "regex": "^[a-zA-Z]{2,20}$"
            },
            "lastname": {
                "required": True,
                "type": "string",
                "empty": False,
                "minlength": 2,
                "maxlength": 20,
                "regex": "^[a-zA-Z]{2,20}$"
            }
        }

    def validate(self, newUser):
        is_valid = self.validator.validate(newUser)
        errors = self.validator.errors
        if newUser.get("password") != newUser.get("confirmPassword"):
            is_valid = False
            errors.update({"confirmPassword": ["must match with password"]})

        return is_valid, errors
