from flask import jsonify, request

from . import booking
from .. import db
from ..models import Booking, Screening, CinemaUser, Seat


@booking.route("/insert", methods=["GET"])
def insert():
    booking_data = request.get_json()
    screening = Screening.query.get_or_404(booking_data.get("screening_id_fk"))
    cinema_user = CinemaUser.query.get_or_404(booking_data.get("cinema_user_id_fk"))
    seat = Seat.query.get_or_404(booking_data.get("seat_id_fk"))
    booking = Booking(
        screening_id_fk=screening.screening_id,
        cinema_user_id_fk==cinema_user.cinema_user_id,
        screening_id_fk=seat.seat_id,
    )
    db.session.add(booking)
    db.session.commit()

    return jsonify(booking.to_dict())