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
                <Link to = "/HomePage">
                    <img src="https://i.ibb.co/NLLVycn/logo2.png" alt="logo" className="logo"/>
                </Link>
                {window.token=="-1"?
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
                        <li> <Link to = "/FindPage">Find a place</Link> </li>
                        <li> <Link to = "/ListPage">List a place</Link> </li>
                        <li> <Link to = "/HelpPage">Help</Link> </li>
                        <li> <Link to = "/LoginPage">Login</Link> </li>
                        <li> <Link to = "/SignupPage">Sign up</Link> </li>
                    </ul>
                </div>:
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
                        <li> <Link to = "/FindPage">Find a place</Link> </li>
                        <li> <Link to = "/ListPage">List a place</Link> </li>
                        <li> <Link to = "/HelpPage">Help</Link> </li>
                        <li> <Link to = "/LogoutPage">Logout</Link> </li>
                    </ul>
                </div>
                }
            </div>
        )
    }
}

export default NavBar