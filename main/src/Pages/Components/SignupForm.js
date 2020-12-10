import React, { Component } from "react"
import axios from "axios"
import TextField from "@material-ui/core/TextField"
const endpoint = "http://localhost:5000/mattra7-c689b/europe-west/api";

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
    async handleSubmit(event)
    {
        event.preventDefault();
        const res = await axios.post(endpoint + "/signup", this.state)
        console.log(this.state);
    }
    
    render()
    {
        return (
            <div class="rect">
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
                    <br />
                    <br />
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
                        label="Password" 
                        type = "password"
                        variant = "filled"
                        color = "secondary"
                        name = "password"
                        onChange = {this.handleChange}   
                    />
                    <br/>
                    <TextField className="Password"
                        id="filled-basic" 
                        label="Confirm Password" 
                        type = "password"
                        variant = "filled"
                        color = "secondary"    
                        name = "confirmPassword"
                        onChange = {this.handleChange}   
                    />
                    <br />
                    
                    <input type = "submit" value = "Sign up" />
                </form>
            </div>
        )
    }
}

export default SingupForm