import React, { Component, useState, useEffect } from "react"
import axios from "axios"
import Item from "./Components/Item"
// import {endpoint} from "./Components/Vars"

function AdPage(props) {

    const [Ad, setAd] = useState({})

    const fetchAd = async (itemId) => {
        const {data, status} = await axios.get(window.endpoint + `/places/${itemId}`);
        if(status == 200) setAd(data);
    }

    useEffect(() => {
        console.log(props.match.params.itemId);
        fetchAd(props.match.params.itemId);
    }, [])
    return (
        <div className="Ad">
            <Item item={Ad} />
        </div>
    )
}

export default AdPage