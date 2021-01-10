import React, { Component, useState, useEffect } from "react"
import axios from "axios"
import Item from "../Components/Item"
// import {endpoint} from "./Components/Vars"

function AdPage(props) {

    useEffect(() => {
        console.log(props.match.params.itemId);
    }, [])
    return (
        <div className="Ad">
            Hello world
        </div>
    )
}

export default AdPage