import json

from flask import Response, jsonify, request
from flask_socketio import emit

from app import db, socketio
from app.booking import booking
from app.models import Booking, CinemaUser, Screening, Seat


@socketio.on("connect")
def joined():
    print("\n\n\nJoined!!!", flush=True)


@socketio.on("get bookings")
def get_bookings():
    print("\n\n\n\nhere", flush=True)
    all_bookings = [booking.to_dict() for booking in Booking.query.all()]
    emit("initial_bookings", json.dumps(all_bookings))

@socketio.on("get seats")
def select_booked_seats_by_screening(data):
    print("\n\n\ndata", data, flush=True)
    screening_id = int(data.get("screeningId"))
    booked_seats = [
        seat[0] for seat in 
        Booking.query.filter_by(screening_id_fk=screening_id).with_entities(Booking.seat_id_fk).all()
    ]
    emit("accept seats", json.dumps(booked_seats))


@socketio.on("book seat")
def book_seat(bookings_data):
    print("\n\n\nbooking_data", bookings_data, flush=True)
    for booking_data in bookings_data:
        screening = Screening.query.get_or_404(int(booking_data.get("screening_id_fk")))
        print("\n\n\nscreening", screening, flush=True)
        cinema_user = CinemaUser.query.get_or_404(int(booking_data.get("cinema_user_id_fk")))
        print("\n\n\nuser", cinema_user, flush=True)
        seat = Seat.query.get_or_404(int(booking_data.get("seat_id_fk")))
        print("\n\n\nseat", seat, flush=True)
        booking = Booking(
            screening_id_fk=screening.screening_id,
            cinema_user_id_fk=cinema_user.cinema_user_id,
            seat_id_fk=seat.seat_id,
        )
        print("\n\n\nbookings", booking, flush=True)

        db.session.add(booking)
        db.session.commit()

        print("\n\n\nbooking commited", booking, flush=True)

    booked_seats = [
        seat[0] for seat in 
        Booking.query.filter_by(screening_id_fk=screening.screening_id).with_entities(Booking.seat_id_fk).all()
    ]

    print("\n\n\nbooked seats", booked_seats, flush=True)

    emit("updated seats", json.dumps(booked_seats), broadcast=True)


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


# @booking.route("/select/booked/seats/<int:screening_id>", methods=["GET"])
# def select_booked_seats_by_screening(screening_id):
#     booked_seats = [
#         seat[0] for seat in 
#         Booking.query.filter_by(screening_id_fk=screening_id).with_entities(Booking.seat_id_fk).all()
#     ]
#     return jsonify(booked_seats)