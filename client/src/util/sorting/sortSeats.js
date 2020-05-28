export const sortSeats = (auditorium) => {
    const rows = [...new Set(auditorium.seats.map(seat => seat.row))].sort();
    const sortedSeats = Object.assign(
        {}, ...rows.map(
            row => ({
                [row]: auditorium.seats.filter(
                    seat => seat.row === row
                )
                .sort((seat1, seat2) => {
                    if (seat1.number < seat2.number) {
                        return -1;
                    }
                    if (seat1.number > seat2.number) {
                        return 1;
                    }
                    return 0;
                })
            })
        )
    );

    auditorium.seats = sortedSeats;
    return auditorium;
}


