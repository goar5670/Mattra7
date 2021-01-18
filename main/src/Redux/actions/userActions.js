import { 
    SET_USER, 
    SET_ERRORS,
    CLEAR_ERRORS, 
    LOADING_UI,
    LOADING_USER,
    SET_UNAUTHENTICATED
} from '../types'

import axios from 'axios'

export const loginUser = (userData, history) => (dispatch) => 
{
    dispatch({ type: CLEAR_ERRORS })
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
    dispatch({ type: CLEAR_ERRORS })
    dispatch({ type: LOADING_UI });
    axios.post('/signup', newUser)
        .then(res => {
            Util(res.data.token, history, dispatch);
        }) .catch(e => {
            // console.log(e);
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
    dispatch(getUserData())
    .then(() => {
        dispatch({type: CLEAR_ERRORS});
        history.push('/Home')
    })
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED});
}

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER})
    return axios.get('/user')
    .then(res => {
        dispatch({
            type: SET_USER,
            payload: res.data
        })
    }) .catch(e => {
        console.log(e);
    })
}