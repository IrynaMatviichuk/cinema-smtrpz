import { SET_SCREENINGS, LOADING_DATA, POST_FEEDBACK, DELETE_FEEDBACK } from '../types';
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
            })
        })
        .catch(err => {
            dispatch({
                type: SET_SCREENINGS,
                payload: []
            })
        })
}


// Post feedback
export const postFeedback = (newFeedback) => dispatch => {
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
export const deleteFeedback = (newFeedback) => dispatch => {
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