import {
    SET_SCREENINGS,
    SET_SCREENING,
    POST_SCREENING,
    UPDATE_SCREENING,
    DELETE_SCREENING,
    SET_MOVIES,
    SET_MOVIE,
    POST_MOVIE,
    UPDATE_MOVIE,
    DELETE_MOVIE,
    SET_AUDITORIUMS,
    SET_AUDITORIUM,
    SET_BOOKINGS,
    SET_USER_BOOKINGS,
    SET_BOOKED_SEATS,
    POST_BOOKING,
    SET_GENRES,
    POST_FEEDBACK,
    DELETE_FEEDBACK,
    LOADING_DATA,
} from '../types';


const initialState = {
    screenings: [],
    screening: {},
    movies: [],
    movie: {},
    auditoriums: [],
    auditorium: {},
    genres: [],
    bookedSeats: [],
    userBookings: [],
    bookings: [],
    loading: false
};


export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_SCREENINGS:
            return {
                ...state,
                screenings: action.payload,
                loading: false
            }
        case SET_BOOKINGS:
            return {
                ...state,
                bookings: action.payload,
                loading: false
            }
        case SET_USER_BOOKINGS:
            return {
                ...state,
                userBookings: action.payload,
                loading: false
            }
        case SET_SCREENING:
            return {
                ...state,
                screening: action.payload
            }
        case POST_SCREENING:
            return {
                ...state,
                screenings: [
                    action.payload,
                    ...state.screenings
                ]
            }
        case DELETE_SCREENING:
            let screeningIndex = state.screenings.findIndex(screening => screening.screening_id === action.payload);
            state.screenings.splice(screeningIndex, 1);
            return {
                ...state
            }
        case SET_MOVIES:
            return {
                ...state,
                movies: action.payload,
                loading: false
            }
        case SET_MOVIE:
            return {
                ...state,
                movie: action.payload
            }
        case UPDATE_MOVIE:
            let movieToUpdate = state.movies.findIndex(movie => movie.movie_id === action.payload.movie_id);
            state.movies[movieToUpdate] = action.payload;
            return {
                ...state,
                // movie: action.payload
            }
        case UPDATE_SCREENING:
            let screeningToUpdate = state.screenings.findIndex(screening => screening.screening_id === action.payload.screening_id);
            state.screenings[screeningToUpdate] = action.payload;
            return {
                ...state,
                // screening: action.payload
            }
        case POST_MOVIE:
            return {
                ...state,
                movies: [
                    action.payload,
                    ...state.movies
                ]
            }
        case DELETE_MOVIE:
            let movieIndex = state.movies.findIndex(movie => movie.movie_id === action.payload);
            state.movies.splice(movieIndex, 1);
            return {
                ...state
            }
        case SET_AUDITORIUMS:
            return {
                ...state,
                auditoriums: action.payload,
                loading: false
            }
        case SET_AUDITORIUM:
            return {
                ...state,
                auditorium: action.payload
            }
        case SET_BOOKED_SEATS:
            return {
                ...state,
                bookedSeats: action.payload
            }
        case POST_BOOKING:
            return {
                ...state,
                bookedSeats: [
                    action.payload.seat_id_fk.seat_id,
                    ...state.bookedSeats
                ],
                userBookings: [
                    action.payload,
                    ...state.userBookings
                ]
            }
        case SET_GENRES:
            return {
                ...state,
                genres: action.payload,
                loading: false
            }
        case POST_FEEDBACK:
            return {
                ...state,
                screening: {
                    ...state.screening,
                    movie: {
                        ...state.screening.movie,
                        feedbacks: [action.payload, ...state.screening.movie.feedbacks]
                    }
                }
            }
        case DELETE_FEEDBACK:
            return {
                ...state
            }
        default:
            return state;
    }
}