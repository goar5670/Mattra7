import {  
    SET_PLACES
} from '../types'

const initialState = {
    loading: false,
    places: [],
}

export default function(state = initialState, action)
{
    switch(action.type) {
        case SET_PLACES:
            return {
                ...state,
                places: action.payload
            }
       default:
            return state;
    }
}