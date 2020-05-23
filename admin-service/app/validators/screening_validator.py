from datetime import datetime

from cerberus import Validator
from config import working_day_end, working_day_start


class ScreeningCreateValidator:
    def __init__(self):
        self.validator = Validator()
        self.validator.schema = {
            "movie_id_fk": {
                "required": True,
                "type": "integer",
            },
            "auditorium_id_fk": {
                "required": True,
                "type": "integer",
            },
            "price": {
                "required": True,
                "type": "integer",
                "min": 1,
            },
            "screening_date": {
                "required": True,
                "type": "string",
                "regex": "^[0-9]{4}-[0-9]{2}-[0-9]{2}$"
            },
            "start_time": {
                "required": True,
                "type": "string",
                "regex": "^[0-9]{2}:[0-9]{2}:[0-9]{2}$"
            },
        }

    def validate(self, new_screening):
        is_valid = self.validator.validate(new_screening)
        errors = self.validator.errors
        if new_screening.get("screening_date") <= datetime.now().strftime("%Y-%m-%d"):
            is_valid = False
            errors.update({
                "screening_date": ["can only schedule screening tomorrow or later"]
            })

        if new_screening.get("start_time") < working_day_start or new_screening.get("start_time") > working_day_end:
            is_valid = False
            errors.update({
                "start_time": [f"screening can start between {working_day_start} and {working_day_end}"]
            })

        return is_valid, errors


class ScreeningUpdateValidator:
    def __init__(self):
        self.validator = Validator()
        self.validator.schema = {
            "movie_id_fk": {
                "required": False,
                "type": "integer",
            },
            "auditorium_id_fk": {
                "required": False,
                "type": "integer",
            },
            "price": {
                "required": False,
                "type": "integer",
                "min": 1,
            },
            "screening_date": {
                "required": False,
                "type": "string",
                "regex": "^[0-9]{4}-[0-9]{2}-[0-9]{2}$"
            },
            "start_time": {
                "required": False,
                "type": "string",
                "regex": "^[0-9]{2}:[0-9]{2}:[0-9]{2}$"
            },
        }

    def validate(self, new_screening):
        is_valid = self.validator.validate(new_screening)
        errors = self.validator.errors
        if new_screening.get("screening_date") and new_screening.get("screening_date") <= datetime.now().strftime("%Y-%m-%d"):
            is_valid = False
            errors.update({
                "screening_date": ["can only schedule screening tomorrow or later"]
            })

        if new_screening.get("start_time") and (new_screening.get("start_time") < working_day_start or new_screening.get("start_time") > working_day_end):
            is_valid = False
            errors.update({
                "start_time": [f"screening can start between {working_day_start} and {working_day_end}"]
            })

        return is_valid, errors
