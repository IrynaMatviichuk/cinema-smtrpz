export const sortSeats = auditorium => {
    const rows = [...new Set(auditorium.seats.map(seat => seat.row))].sort();
    const sortedSeats = Object.assign(
        {}, ...rows.map(
            row => ({
                [row]: auditorium.seats.filter(
                    seat => seat.row === row
                )
                    .sort((seat1, seat2) => {
                        if (seat1.number < seat2.number) return -1;
                        if (seat1.number > seat2.number) return 1;

                        return 0;
                    })
            })
        )
    );

    auditorium.seats = sortedSeats;
    return auditorium;
}


export const sortMovieData = movie => {
    return sortScreenings(movie);
}


export const sortMoviesData = movies => {
    return movies.map(movie => sortScreenings(movie)).map(movie => sortFeedbacks(movie));
}


export const sortScreenings = movie => {
    const days = [...new Set(movie.screenings.map(screening => screening.screening_date))].sort();
    const sortedScreenings = Object.assign(
        {}, ...days.map(
            day => ({
                [day]: movie.screenings.filter(
                    screening => screening.screening_date === day
                )
                    .sort((screening1, screening2) => {
                        if (screening1.start_time < screening2.start_time) return -1;
                        if (screening1.start_time > screening2.start_time) return 1;

                        return 0;
                    })
            })
        )
    );

    movie.screenings = sortedScreenings;
    return movie;
}



export const sortFeedbacks = movie => {
    const sortedFeedbacks = movie.feedbacks.sort((feedback1, feedback2) => {
        if (feedback1.feedback_date > feedback2.feedback_date) return -1;
        if (feedback1.feedback_date < feedback2.feedback_date) return 1;
        if (feedback1.feedback_date === feedback2.feedback_date) {
            if (feedback1.feedback_time > feedback2.feedback_time) return -1;
            if (feedback1.feedback_time < feedback2.feedback_time) return 1;
            return 0;
        }
        return 0;
    });

    movie.feedbacks = sortedFeedbacks;
    return movie;
}


export const sortMoviesByFeedbacks = (movies, order) => {
    movies.sort((movie1, movie2) => {
        const movieScore1 = movie1.feedbacks.length === 0 ? 0 : (movie1.feedbacks.reduce((accumulator, feedback) => accumulator + feedback.score, 0) / movie1.feedbacks.length);
        const movieScore2 = movie2.feedbacks.length === 0 ? 0 : (movie2.feedbacks.reduce((accumulator, feedback) => accumulator + feedback.score, 0) / movie2.feedbacks.length);

        if (movieScore1 < movieScore2) return -1;
        else if (movieScore1 > movieScore2) return 1;
        return 0;
    });

    if (order === 1) {
        movies.reverse()
    }

    return movies;
}