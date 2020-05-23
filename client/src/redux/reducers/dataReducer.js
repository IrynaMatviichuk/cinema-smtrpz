import { SET_SCREENINGS, POST_FEEDBACK, DELETE_FEEDBACK, LOADING_DATA } from '../types';


const initialState = {
    screenings: [],
    screening: {},
    loading: false
};


export default function(state = initialState, action) {
    switch(action.type) {
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
        // case POST_FEEDBACK:
        //     return {

        //     }
        // case DELETE_FEEDBACK:
        default:
            return state;
    }
}