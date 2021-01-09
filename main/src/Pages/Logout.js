import React, { Component, useState, useEffect} from "react"
import {Redirect} from "react-router-dom"

function LogoutPage(props)
{   
    const Logout = () => {
        window.token = "-1"
        props.history.push("./HomePage");
    }
    useEffect(() => {
        Logout();
    }, [])
    return <Redirect to = "./HomePage"/>
}


export default LogoutPage;