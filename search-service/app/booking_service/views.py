from flask import jsonify

from . import booking_service
from .. import db
from .. models import Booking


@booking_service.route("/select/all", methods=["GET"])
def select_all():
    all_bookings = [booking.to_dict() for booking in Booking.query.all()]
    return jsonify(all_bookings)


@booking_service.route("/select/booked/seats/<int:screening_id>", methods=["GET"])
def select_booked_seats_by_screening(screening_id):
    booked_seats = [
        seat[0] for seat in
        Booking.query.filter_by(screening_id_fk=screening_id).with_entities(Booking.seat_id_fk).all()
    ]
    return jsonify(booked_seats)