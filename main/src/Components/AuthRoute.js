import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'

//Redux
import { connect } from 'react-redux'
import PropTypes from 'prop-types' 

const AuthRoute = ({component: Component, authenticated, ...rest}) =>
{
    return <Route
    {...rest}
    render={(props) => {
        return authenticated === true?
         <Redirect to ='/Home' /> : <Component {...props} />
    }} />
}

AuthRoute.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(AuthRoute)