import React, { Component, useState, useEffect} from "react"
import NavBar from "./Components/NavBar"
import axios from "axios"
import PhotoInput from "./Components/PhotoInput"
const endpoint = "https://jsonbox.io/box_0bb53cd4d9fe6af89921";

function FindPage()
{
    
    const [temp, setTemp] = useState([])

    const fetchContent = async () => {
        const {status, data} = await axios.get(endpoint)
        if(status === 200) setTemp(data)
    }

    useEffect(() => {
        fetchContent();
    }, [])

    return (
        <div className = "List">
            <NavBar />
            <div className = "main">
                {/* {temp.map(t=> <img src={t.item.pictures[0]} />)} */}
            </div>
        </div>
    )
}

export default FindPage