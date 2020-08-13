import React, { Component, useState, useEffect } from "react"
import axios from "axios"
import Item from "./Components/Item"
const endpoint = "https://jsonbox.io/box_7da96f8e3be60f9bb113";

function AdPage(props) {

    const [Ad, setAd] = useState({})

    const fetchAd = async (itemId) => {
        // const {match: {params}} = props;
        const {data, status} = await axios.get(endpoint + `/todos/${itemId}`);
        setAd(data.item)
    }

    useEffect(() => {
        fetchAd(props.match.params.itemId);
    }, [])
    return (
        <div>
            <Item item={Ad} />
        </div>
    )
}

export default AdPage