import React, { Component } from "react"
import axios from "axios"
import TextField from "@material-ui/core/TextField"
import {Redirect} from "react-router-dom"

// import {Popover, Button} from "@blueprintjs/core"
class LoginForm extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
        
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event)
    {
        if(event.target.type === "checkbox")
        {
            this.setState(
                {
                    [event.target.name]: event.target.checked
                }
            )
        }
        else
        {
            this.setState(
                {
                    [event.target.name]: event.target.value
                }
            )
        }
    }
    async handleSubmit(event) {
        event.preventDefault()
        // const res = await axios.post(window.endpoint + "/login", this.state)
        
        // if(res.status == 200)
        // {
        //     window.token = res.data.token;
        //     console.log(window.token)
        // }
    }
    render()
    {
        return (
            <div class="rect">
                <form onSubmit = {this.handleSubmit}>
                    <img src="https://i.ibb.co/wrH293p/Mattra7-logo-1.png" alt="logo" />
                    <h3>Log in to Mattra7</h3>
                    <TextField className="Email"
                        id="filled-basic" 
                        label="Email" 
                        type = "email"
                        variant = "filled"
                        color = "secondary" 
                        name = "email"
                        onChange = {this.handleChange}      
                    />
                    <br/>
                    <TextField className="Password"
                        id="filled-basic" 
                        label="Pasword" 
                        type = "password"
                        variant = "filled"
                        color = "secondary"
                        name = "password"
                        onChange = {this.handleChange}   
    
                    />
                    <br/>
                    <input type = "submit" value = "Log in" />
                </form>
            </div>
        )
    }
}

export default LoginForm