import {
    LOADING_DATA,
    LOADING_UI,
    STOP_LOADING_UI,
    SET_SCREENINGS,
    SET_SCREENING,
    POST_SCREENING,
    DELETE_SCREENING,
    SET_MOVIES,
    SET_AUDITORIUMS,
    POST_FEEDBACK,
    DELETE_FEEDBACK,
    SET_ERRORS,
    CLEAR_ERRORS
} from '../types';
import axios from 'axios';


// Get all screeings
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


// Get a screening
export const getScreening = screeningId => dispatch => {
    dispatch({ type: LOADING_UI });
    axios
        .get(`/screening/get/${screeningId}`)
        .then(res => {
            console.log("getScreening",res);
            dispatch({
                type: SET_SCREENING,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch(err => console.log(err));
}


// Post a screening
export const postScreening = (newScreening) => dispatch => {
    dispatch({ type: LOADING_UI });
    axios
        .post('/admin/screening/insert', newScreening)
        .then(res => {
            dispatch({
                type: POST_SCREENING,
                payload: res.data
            });
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch(err => {
            console.log(err);
            console.log(err.response)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        })
}


// Delete screening
export const deleteScreening = (screeningId) => dispatch => {
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
            console.log('action', res.data);
            dispatch({
                type: SET_MOVIES,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_MOVIES,
                payload: []
            })
        });
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
            })
        })
        .catch(err => {
            dispatch({
                type: SET_AUDITORIUMS,
                payload: []
            })
        });
}


// Post feedback
export const postFeedback = newFeedback => dispatch => {
    axios
        .post('/feedback/insert')
        .then(res => {
            dispatch({
                type: POST_FEEDBACK,
                payload: res.data
            })
            .catch(err => console.log(err));
        })
}

// Delete feedback
export const deleteFeedback = newFeedback => dispatch => {
    axios
        .post('/feedback/delete')
        .then(res => {
            dispatch({
                type: POST_FEEDBACK,
                payload: res.data
            })
            .catch(err => console.log(err));
        })
}


export const clearErrors = () => dispatch => {
    dispatch({ type: CLEAR_ERRORS });
}