from flask import jsonify, request, Response
import json

from . import booking
from .. import db
from ..models import Booking, Screening, CinemaUser, Seat


@booking.route("/select/all", methods=["GET"])
def select_all():
    all_bookings = [booking.to_dict() for booking in Booking.query.all()]
    return jsonify(all_bookings)


@booking.route("/insert", methods=["POST"])
def insert():
    booking_data = request.get_json()
    screening = Screening.query.get_or_404(booking_data.get("screening_id_fk"))
    cinema_user = CinemaUser.query.get_or_404(booking_data.get("cinema_user_id_fk"))
    seat = Seat.query.get_or_404(booking_data.get("seat_id_fk"))
    booking = Booking(
        screening_id_fk=screening.screening_id,
        cinema_user_id_fk=cinema_user.cinema_user_id,
        seat_id_fk=seat.seat_id,
    )

    if screening.auditorium_id_fk != seat.auditorium_id_fk:
        return Response(json.dumps({"error": "screening and seat in different auditoriums"}), status=400)
    else:
        db.session.add(booking)
        db.session.commit()

        return jsonify(booking.to_dict())


@booking.route("/delete/<int:booking_id>", methods=["DELETE"])
def delete(booking_id):
    booking = Booking.query.get_or_404(booking_id)
    db.session.delete(booking)
    db.session.commit()

    return jsonify(booking.to_dict(use_id=True))