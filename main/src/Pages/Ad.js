import React, { Component, useState, useEffect } from "react"
import axios from "axios"
import PlaceCard from "../Components/PlaceCard"
// import {endpoint} from "./Components/Vars"

function AdPage(props) {

    useEffect(() => {
        console.log(props.match.params.placeId);
    }, [])
    return (
        <div className="Ad">
            Hello world
        </div>
    )
}

export default AdPage