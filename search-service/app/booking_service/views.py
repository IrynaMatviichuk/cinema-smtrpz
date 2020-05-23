from flask import jsonify

from app import db
from app.access import admin_access, user_access
from app.booking_service import booking_service
from app.models import Booking


@admin_access
@booking_service.route("/select/all", methods=["GET"])
def select_all():
    all_bookings = [booking.to_dict() for booking in Booking.query.all()]
    return jsonify(all_bookings)


@booking_service.route("/select/cinema_user/<int:cinema_user_id>", methods=["GET"])
@user_access
def select_cinema_user_bookings(cinema_user_id):
    cinema_user_bookings = [
        booking.to_dict() for booking in 
        Booking.query.filter_by(cinema_user_id_fk=cinema_user_id).all()
    ]
    return jsonify(cinema_user_bookings)


@booking_service.route("/select/booked/seats/<int:screening_id>", methods=["GET"])
def select_booked_seats_by_screening(screening_id):
    booked_seats = [
        seat[0] for seat in 
        Booking.query.filter_by(screening_id_fk=screening_id).with_entities(Booking.seat_id_fk).all()
    ]
    return jsonify(booked_seats)
