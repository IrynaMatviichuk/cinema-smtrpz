import {
    LOADING_DATA,
    LOADING_UI,
    STOP_LOADING_UI,
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
    SET_USER_BOOKINGS,
    SET_BOOKED_SEATS,
    POST_BOOKING,
    SET_GENRES,
    POST_FEEDBACK,
    DELETE_FEEDBACK,
    SET_ERRORS,
    CLEAR_ERRORS,
    SET_USERS,
    SET_BOOKINGS_TO_DISPLAY
} from '../types';
import axios from 'axios';
import { sortSeats, sortMovieData, sortMoviesData } from '../../util/sortings';


// Get all screenings
export const getScreenings = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios
        .get('/screening/select/all')
        .then(res => {
            dispatch({
                type: SET_SCREENINGS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: SET_SCREENINGS,
                payload: []
            })
        });
}


// Get all users
export const getUsers = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios
        .get('/auth/users')
        .then(res => {
            dispatch({
                type: SET_USERS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: SET_USERS,
                payload: []
            });
        });
}


// Get a screening
export const getScreening = screeningId => dispatch => {
    dispatch({ type: LOADING_UI });
    axios
        .get(`/screening/get/${screeningId}`)
        .then(res => {
            dispatch({
                type: SET_SCREENING,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch(err => console.log(err));
}


// Post a screening
export const postScreening = newScreening => dispatch => {
    dispatch({ type: LOADING_UI });
    axios
        .post('/admin/screening/insert', newScreening)
        .then(res => {
            dispatch({
                type: POST_SCREENING,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        })
}


// Update a screening
export const updateScreening = (updatedScreening, screeningId) => dispatch => {
    dispatch({ type: LOADING_UI });
    axios
        .put(`admin/screening/update/${screeningId}`, updatedScreening)
        .then(res => {
            dispatch({
                type: UPDATE_SCREENING,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
}


// Delete screening
export const deleteScreening = screeningId => dispatch => {
    axios
        .delete(`/admin/screening/delete/${screeningId}`)
        .then(() => {
            dispatch({
                type: DELETE_SCREENING,
                payload: screeningId
            })
        })
        .catch(err => console.log(err));
}


// Get all movies
export const getMovies = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios
        .get('/movie/select/all')
        .then(res => {
            dispatch({
                type: SET_MOVIES,
                payload: sortMoviesData(res.data)
            })
        })
        .catch(err => {
            dispatch({
                type: SET_MOVIES,
                payload: []
            })
        });
}


// Get a movie
export const getMovie = movieId => dispatch => {
    dispatch({ type: LOADING_UI });
    axios
        .get(`/movie/get/${movieId}`)
        .then(res => {
            dispatch({
                type: SET_MOVIE,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch(err => console.log(err));
}


// Post a movie
export const postMovie = newMovie => dispatch => {
    dispatch({ type: LOADING_UI });
    axios
        .post('admin/movie/insert', newMovie)
        .then(res => {
            dispatch({
                type: POST_MOVIE,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
}


// Update a movie
export const updateMovie = (updatedMovie, movieId) => dispatch => {
    dispatch({ type: LOADING_UI });
    axios
        .put(`admin/movie/update/${movieId}`, updatedMovie)
        .then(res => {
            dispatch({
                type: UPDATE_MOVIE,
                payload: sortMovieData(res.data)
            });
            dispatch({ type: STOP_LOADING_UI });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
}


// Delete movie
export const deleteMovie = movieId => dispatch => {
    axios
        .delete(`/admin/movie/delete/${movieId}`)
        .then(() => {
            dispatch({
                type: DELETE_MOVIE,
                payload: movieId
            })
        })
        .catch(err => console.log(err));
}


// Get all auditoriums
export const getAuditoriums = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios
        .get('/auditorium/select/all')
        .then(res => {
            dispatch({
                type: SET_AUDITORIUMS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: SET_AUDITORIUMS,
                payload: []
            });
        });
}


// Get auditorium
export const getAuditorium = auditoriumId => dispatch => {
    dispatch({ type: LOADING_UI });
    axios
        .get(`/auditorium/get/${auditoriumId}`)
        .then(res => {
            dispatch({
                type: SET_AUDITORIUM,
                payload: sortSeats(res.data)
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch(err => console.log(err));
}


// Get all bookings
export const getBookings = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios
        .get('/booking/select/all')
        .then(res => {
            dispatch({
                type: SET_BOOKINGS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: SET_BOOKINGS,
                payload: []
            });
        });
}


// Search bookings
export const searchUserBookings = userId => dispatch => {
    dispatch({
        type: SET_BOOKINGS_TO_DISPLAY,
        payload: userId
    });
}


// Search movies
export const searchMovies = searchParameters => dispatch => {
    dispatch({
        type: SET_MOVIES_TO_DISPLAY,
        payload: searchParameters
    })
}



// Get all user bookings
export const getUserBookings = userId => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios
        .get(`/booking/select/cinema_user/${userId}`)
        .then(res => {
            dispatch({
                type: SET_USER_BOOKINGS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: SET_USER_BOOKINGS,
                payload: []
            })
        });
}


// Get booked seats
export const getBookedSeats = screeningId => dispatch => {
    dispatch({ type: LOADING_UI });
    axios
        .get(`/booking/select/booked/seats/${screeningId}`)
        .then(res => {
            dispatch({
                type: SET_BOOKED_SEATS,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch(err => console.log(err));
}


// Post a booking
export const postBooking = newBooking => dispatch => {
    dispatch({ type: LOADING_UI });
    for (let seat of newBooking) {
        axios
            .post('/book/insert', seat)
            .then(res => {
                dispatch({
                    type: POST_BOOKING,
                    payload: res.data
                });
                dispatch(clearErrors());
            })
            .catch(err => {
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                });
            })
    }
}


// Get all genres
export const getGenres = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios
        .get('/genre/select/all')
        .then(res => {
            dispatch({
                type: SET_GENRES,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: SET_GENRES,
                payload: []
            });
        });
}


// Post feedback
export const postFeedback = newFeedback => dispatch => {
    axios
        .post('/feedback/insert', newFeedback)
        .then(res => {
            dispatch({
                type: POST_FEEDBACK,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
}

// Delete feedback
export const deleteFeedback = (feedbackId, movieId) => dispatch => {
    axios
        .delete(`/feedback/delete/${feedbackId}`)
        .then(() => {
            dispatch({
                type: DELETE_FEEDBACK,
                payload: {
                    feedbackId,
                    movieId
                }
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch(err => console.log(err));
}


export const clearErrors = () => dispatch => {
    dispatch({ type: CLEAR_ERRORS });
}