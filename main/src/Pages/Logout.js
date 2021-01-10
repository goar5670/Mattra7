import React, { Component, useState, useEffect} from "react"
import {Redirect} from "react-router-dom"

//Redux
import store from '../Redux/store'
import { logoutUser } from '../Redux/actions/userActions'

class Logout extends Component
{   
    render()
    {
        store.dispatch(logoutUser());
        return <Redirect to = "./Home"/>
    }    
}


export default Logout;