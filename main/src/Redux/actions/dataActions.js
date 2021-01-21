import { SET_PLACES } from '../types'

import axios from 'axios'

export const fetchPlaces = (filter) => (dispatch) => 
{
    return axios.get('/places', {params: filter})
        .then(res => {
            dispatch({ 
                type: SET_PLACES,
                payload: res.data.places 
            });
        }) .catch(e => {
            
            console.log(e);
        })
}
