import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types';
import axios from 'axios';


export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/auth/login', userData)
        .then(res => {
            const token = `Bearer ${res.data.token}`;
            localStorage.setItem('token', token);
            axios.default.headers.common['Authorization'] = token;
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
        })
        .catch(err => {
            // console.log(err);
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
}


export const getUserData = () => (dispatch) => {
    axios.get('/auth/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
}