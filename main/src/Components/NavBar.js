import React, { Component } from "react"
import {Link } from "react-router-dom"
// import "./NavBar.css"
class NavBar extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            language: "arabic"
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event)
    {
        window.$lang = event.target.value
        setTimeout(() => {
            console.log(window.$lang)
        }, 1500);
    }

    render ()
    {
        return (
            <div className="nav">
                <Link to = "/Home">
                    <img src="https://i.ibb.co/NLLVycn/logo2.png" alt="logo" className="logo"/>
                </Link>
                <div className = "nav-list">
                    <ul>
                        <li> 
                            <div className= "langpick"> 
                                <select onChange={this.handleChange} name = "language" defaultValue = {window.lang}>
                                    <option className="arabic" value="arabic" >
                                        العربية
                                    </option>
                                    <option value="english" >
                                        English
                                    </option>
                                </select> 
                            </div> 
                        </li>
                        <li> <Link to = "/Find">Find a place</Link> </li>
                        <li> <Link to = "/List">List a place</Link> </li>
                        <li> <Link to = "/Help">Help</Link> </li>
                        <li> <Link to = "/Login">Login</Link> </li>
                        <li> <Link to = "/Signup">Sign up</Link> </li>
                    </ul>
                </div>
                {/* :
                <div className = "nav-list">
                    <ul>
                        <li> 
                            <div className= "langpick"> 
                                <select onChange={this.handleChange} name = "language">
                                    <option className="arabic" value="arabic" selected = {window.lang==="arabic"}>
                                        العربية
                                    </option>
                                    <option value="english" selected = {window.lang==="english"}>
                                        English
                                    </option>
                                </select> 
                            </div> 
                        </li>
                        <li> <Link to = "/Find">Find a place</Link> </li>
                        <li> <Link to = "/List">List a place</Link> </li>
                        <li> <Link to = "/Help">Help</Link> </li>
                        <li> <Link to = "/Logout">Logout</Link> </li>
                    </ul>
                </div>
                } */}
            </div>
        )
    }
}

export default NavBar