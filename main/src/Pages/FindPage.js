import React, { Component } from "react"
import NavBar from "./Components/NavBar"
class FindPage extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {

        }
    }

    render()
    {
        return (
            <div className = "List">
                <NavBar />
                <div classaName = "main">
                    code goes here ...
                </div>
            </div>
        )
    }
}

export default FindPage