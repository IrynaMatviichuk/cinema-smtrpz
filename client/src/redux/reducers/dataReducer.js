import {
    SET_SCREENINGS,
    POST_SCREENING,
    DELETE_SCREENING,
    SET_MOVIES,
    SET_AUDITORIUMS,
    POST_FEEDBACK,
    DELETE_FEEDBACK,
    LOADING_DATA
} from '../types';


const initialState = {
    screenings: [],
    screening: {},
    movies: [],
    auditoriums: [],
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
        case POST_SCREENING:
            console.log('reducer', action.payload);
            return {
                ...state,
                screenings: [
                    action.payload,
                    ...state.screenings
                ]
            }
        case DELETE_SCREENING:
            let index = state.screenings.findIndex(screening => screening.screening_id === action.payload);
            state.screenings.splice(index, 1);
            return {
                ...state
            }
        case SET_MOVIES:
            return {
                ...state,
                movies: action.payload,
                loading: false
            }
        case SET_AUDITORIUMS:
            return {
                ...state,
                auditoriums: action.payload,
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