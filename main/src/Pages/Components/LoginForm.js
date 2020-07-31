import React, { Component } from "react"
import TextField from "@material-ui/core/TextField"
import {Popover, Button} from "@blueprintjs/core"
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
    handleSubmit(event) {
        event.preventDefault()
        console.log(this.state)
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