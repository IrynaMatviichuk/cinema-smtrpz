import {
    SET_SCREENINGS,
    SET_SCREENING,
    POST_SCREENING,
    UPDATE_SCREENING,
    DELETE_SCREENING,
    SET_MOVIES,
    SET_MOVIE,
    SET_MOVIES_TO_DISPLAY,
    POST_MOVIE,
    UPDATE_MOVIE,
    DELETE_MOVIE,
    SET_AUDITORIUMS,
    SET_AUDITORIUM,
    SET_BOOKINGS,
    SET_BOOKINGS_TO_DISPLAY,
    SET_USER_BOOKINGS,
    SET_BOOKED_SEATS,
    POST_BOOKING,
    SET_GENRES,
    POST_FEEDBACK,
    DELETE_FEEDBACK,
    LOADING_DATA,
    SET_USERS
} from '../types';

import { sortMoviesByFeedbacks } from '../../util/sortings';


const initialState = {
    screenings: [],
    screening: {},
    movies: [],
    moviesToDisplay: [],
    movie: {},
    auditoriums: [],
    auditorium: {},
    genres: [],
    bookedSeats: [],
    userBookings: [],
    bookings: [],
    bookingsToDisplay: [],
    users: [],
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
        case UPDATE_SCREENING:
            let screeningToUpdate = state.screenings.findIndex(screening => screening.screening_id === action.payload.screening_id);
            state.screenings[screeningToUpdate] = action.payload;
            return {
                ...state
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
                moviesToDisplay: action.payload,
                loading: false
            }
        case SET_MOVIE:
            return {
                ...state,
                movie: action.payload
            }
        case SET_MOVIES_TO_DISPLAY:
            let filteredMovies = action.payload.movieId === -1 ? state.movies : (
                state.movies.filter(movie => movie.movie_id === action.payload.movieId)
            );
            filteredMovies = action.payload.genreId === -1 ? filteredMovies : (
                filteredMovies.filter(movie => movie.genre.genre_id === action.payload.genreId)
            );
            filteredMovies = action.payload.sortingOrder === 0 ? filteredMovies : (
                filteredMovies = sortMoviesByFeedbacks(filteredMovies, action.payload.sortingOrder)
            );
            return {
                ...state,
                moviesToDisplay: filteredMovies
            }
        case UPDATE_MOVIE:
            let movieToUpdate = state.movies.findIndex(movie => movie.movie_id === action.payload.movie_id);
            state.movies[movieToUpdate] = action.payload;
            movieToUpdate = state.moviesToDisplay.findIndex(movie => movie.movie_id === action.payload.movie_id);
            state.moviesToDisplay[movieToUpdate] = action.payload;
            return {
                ...state
            }
        case POST_MOVIE:
            return {
                ...state,
                movies: [
                    action.payload,
                    ...state.movies,
                ],
                moviesToDisplay: [
                    action.payload,
                    ...state.moviesToDisplay
                ]
            }
        case DELETE_MOVIE:
            let movieIndex = state.movies.findIndex(movie => movie.movie_id === action.payload);
            state.movies.splice(movieIndex, 1);
            // movieIndex = state.moviesToDisplay.findIndex(movie => movie.movie_id === action.payload);
            // state.moviesToDisplay.splice(movieIndex, 1);
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
        case SET_BOOKINGS:
            return {
                ...state,
                bookings: action.payload,
                bookingsToDisplay: action.payload,
                loading: false
            }
        case SET_BOOKINGS_TO_DISPLAY:
            let filteredBookings = action.payload === -1 ? state.bookings : (
                state.bookings.filter(booking => booking.cinema_user_id_fk.cinema_user_id === action.payload)
            )
            return {
                ...state,
                bookingsToDisplay: filteredBookings
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
                movie: {
                    ...state.movie,
                    feedbacks: [action.payload, ...state.movie.feedbacks]
                }
            }
        case DELETE_FEEDBACK:
            let feedbackMovieIndex = state.movies.findIndex(movie => movie.movie_id === action.payload.movieId);
            let feedbackIndex = state.movies[feedbackMovieIndex].feedbacks.findIndex(feedback => feedback.feedback_id === action.payload.feedbackId);
            state.movies[feedbackMovieIndex].feedbacks.splice(feedbackIndex, 1);
            feedbackIndex = state.movie.feedbacks.findIndex(feedback => feedback.feedback_id === action.payload.feedbackId);
            state.movie.feedbacks.splice(feedbackIndex, 1);
            return {
                ...state,
                movie: {
                    ...state.movie,
                    feedbacks: [...state.movie.feedbacks]
                }
            }
        case SET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        default:
            return state;
    }
}