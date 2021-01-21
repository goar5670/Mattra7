import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types' 

//Redux
import { connect } from 'react-redux'
import { SET_SNACKBAR } from '../Redux/types'
import store from '../Redux/store'

const AuthRoute = ({component: Component, authenticated, ...rest}) =>
{
    if(!authenticated)
    {
        store.dispatch({ type: SET_SNACKBAR })
    }
    return <Route
    {...rest}
    render={(props) => {
        return authenticated?
        <Component {...props} />
        : 
        (
            <Redirect to ='/Login'/>
        ) 
    }} />
}

AuthRoute.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(AuthRoute)