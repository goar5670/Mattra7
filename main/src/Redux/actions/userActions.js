import { 
    SET_USER, 
    SET_ERRORS,
    CLEAR_ERRORS, 
    LOADING_UI,
    SET_UNAUTHENTICATED
} from '../types'

import axios from 'axios'

export const loginUser = (userData, history) => (dispatch) => 
{
    dispatch({ type: LOADING_UI });
    axios.post('/login', userData)
        .then(res => {
            Util(res.data.token, history, dispatch);            
        }) .catch(e => {
            console.log(e);
            dispatch({
                type: SET_ERRORS,
                payload: e.response.data
            })
        })
}

export const signupUser = (newUser, history) => (dispatch) =>
{
    dispatch({ type: LOADING_UI });
    axios.post('/signup', newUser)
        .then(res => {
            Util(res.data.token, history, dispatch);
        }) .catch(e => {
            console.log(e);
            dispatch({
                type: SET_ERRORS,
                payload: e.response.data
            })
        })
}

const Util = (token, history, dispatch) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken; 
    dispatch(getUserData());
    dispatch({type: CLEAR_ERRORS});
    history.push('/Home')
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED});
}

export const getUserData = () => (dispatch) => {
    axios.get('/user')
    .then(res => {
        dispatch({
            type: SET_USER,
            payload: res.data
        })
    }) .catch(e => {
        console.log(e);
    })
}