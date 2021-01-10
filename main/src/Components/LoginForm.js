import React, { Component } from "react"
import Link from "react-router-dom/Link"
import axios from "axios"

//MUI STUFF
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import CircularProgress from "@material-ui/core/CircularProgress"

class LoginForm extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            email: "",
            password: "",
            loading: false,
            errors: {}
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
        const userCred = {
            email: this.state.email,
            password: this.state.password
        }
        this.setState(
            {
                loading: true
            }
        )
        console.log(userCred);
        axios.post('/login', userCred)
        .then(res => {
            // console.log(res.data);
            this.setState({
                loading: false
            });
            this.props.history.push('/Home')
        }) .catch(e => {
            console.log(e);
            this.setState({
                errors: e.response.data,
                loading: false
            })
        })
        // const res = await axios.post("/login", this.state)
        
        // if(res.status == 200)
        // {
        //     window.token = res.data.token;
        //     console.log(window.token)
        // }
    }
    render()
    {
        const {errors} = this.state;
        return (
            <div className="rect">
                <form onSubmit = {this.handleSubmit} noValidate>
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
                        helperText={errors.email}     
                        error={errors.email ? true: false}
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
                        helperText={errors.password}
                        error={errors.password? true: false}
                    />
                    {errors.general && (
                    <Typography variant="body2" className="customError">
                        {errors.general}
                    </Typography>
                    )}
                    <button type = "submit">
                       Log in
                    </button>
                    <small> Don't have an account? <Link className="Link" to="/Signup" > SIGN UP </Link> </small>
                </form>
            </div>
        )
    }
}

export default LoginForm