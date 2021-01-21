import {
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    CLEAR_SNACKBAR,
    SET_SNACKBAR
} from '../types'

const initialState = {
    loading: false,
    errors: null,
    snackbar: false
};

export default function(state = initialState, action) 
{
    switch(action.type) {
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
                loading: false,
            };

        case LOADING_UI:
            return {
                ...state,
                loading: true
            }
        case CLEAR_SNACKBAR: 
            return {
                ...state,
                snackbar: false
            }
        case SET_SNACKBAR:
            return {
                ...state,
                snackbar: true
            }
        default: 
            return state;
    }
}