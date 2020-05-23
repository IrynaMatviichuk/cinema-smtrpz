import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER } from '../types';


const initialState = {
    authenticated: false,
    loading: false,
    cinema_user_id: undefined,
    username: undefined,
    password: undefined,
    firstname: undefined,
    lastname: undefined,
    is_admin: undefined
};


export default function(state = initialState, action) {
    switch(action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            }
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}