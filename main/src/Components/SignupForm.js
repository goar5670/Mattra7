import React, { Component } from "react"
import axios from "axios"
import TextField from "@material-ui/core/TextField"
// import {endpoint} from "./Vars"
import { useForkRef } from "@material-ui/core"

class SingupForm extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            redirect: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    handleSubmit(event)
    {
        event.preventDefault();
        axios.post("/signup", this.state)
        .then({

        })
    }
    
    render()
    {    
        return (
            <div className="rect">
                <form onSubmit = {this.handleSubmit}>
                    <img src="https://i.ibb.co/wrH293p/Mattra7-logo-1.png" alt="logo" />
                    <h3>Create a new account</h3>
                    <TextField className="FirstName"
                        id = "filled-basic" 
                        label = "First Name" 
                        type = "text"
                        variant = "filled"
                        color = "secondary"
                        name = "firstName"
                        onChange = {this.handleChange}
                    />
                    <TextField className="LastName"
                        id="filled-basic" 
                        label="Last Name" 
                        type = "text"
                        variant = "filled"
                        color = "secondary" 
                        name = "lastName"
                        onChange = {this.handleChange}   
                    />
                    <TextField className="Email"
                        id="filled-basic" 
                        label="Email" 
                        type = "email"
                        variant = "filled"
                        color = "secondary"    
                        name = "email"
                        onChange = {this.handleChange}   
                    />
                    <TextField className="Password"
                        id="filled-basic" 
                        label="Password" 
                        type = "password"
                        variant = "filled"
                        color = "secondary"
                        name = "password"
                        onChange = {this.handleChange}   
                    />
                    <TextField className="ConfirmPassword"
                        id="filled-basic" 
                        label="Confirm Password" 
                        type = "password"
                        variant = "filled"
                        color = "secondary"    
                        name = "confirmPassword"
                        onChange = {this.handleChange}   
                    />
                    
                    <button type = "submit">
                        Sign up
                    </button>
                    <small> Don't have an account? <Link className="Link" to="/Signup" > SIGN UP </Link> </small>
                </form>
            </div>
        )
    }
}

export default SingupForm