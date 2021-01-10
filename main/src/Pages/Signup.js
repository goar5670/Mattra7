import React, { Component } from "react"
import {Link} from "react-router-dom"
import PropTypes from 'prop-types'

//Redux
import { connect } from 'react-redux'
import { signupUser } from '../Redux/actions/userActions' 

//MUI
import TextField from "@material-ui/core/TextField"
import Typography  from "@material-ui/core/Typography"
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'

class Signup extends Component
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
            errors: {},
            loading: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps)
    {
        if(nextProps.UI.errors)
        {
            this.setState({
                errors: nextProps.UI.errors
            })
        }
        this.setState({
            loading: nextProps.UI.loading
        })
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
                    errors: {
                        ...this.state.errors,
                        general: "",
                        [event.target.name]: "" 
                    },
                    [event.target.name]: event.target.value
                }
            )
        }   
    }
    handleSubmit(event)
    {
        event.preventDefault();
        const newUser = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        }
        this.props.signupUser(newUser, this.props.history)
    }

    render()
    {
        const {errors, loading} = this.state;
        return (
            <div className = "Signup">
                <div className = "main">
                    <div className = "content">
                        <div className="rect">
                            <form onSubmit = {this.handleSubmit} noValidate>
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
                                    helperText={errors.firstName}     
                                    error={errors.firstName ? true: false}
                                />
                                <TextField className="LastName"
                                    id="filled-basic" 
                                    label="Last Name" 
                                    type = "text"
                                    variant = "filled"
                                    color = "secondary" 
                                    name = "lastName"
                                    onChange = {this.handleChange}   
                                    error={errors.lastName ? true: false}
                                    helperText={errors.lastName}     
                               />
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
                                <TextField className="Password"
                                    id="filled-basic" 
                                    label="Password" 
                                    type = "password"
                                    variant = "filled"
                                    color = "secondary"
                                    name = "password"
                                    onChange = {this.handleChange} 
                                    helperText={errors.password}     
                                    error={errors.password? true: false}  
                                />
                                <TextField className="ConfirmPassword"
                                    id="filled-basic" 
                                    label="Confirm Password" 
                                    type = "password"
                                    variant = "filled"
                                    color = "secondary"    
                                    name = "confirmPassword"
                                    onChange = {this.handleChange}  
                                    helperText={errors.confirmPassword}     
                                    error={errors.confirmPassword ? true: false}
                                />
                                
                                {errors.general && (
                                <Typography variant="body2" className="customError">
                                    {errors.general}
                                </Typography>
                                )}

                                <Button type = "submit" disabled={loading}>
                                    {loading? <CircularProgress color="white" /> : "Sign up" } 
                                </Button>
                                <small> Already have an account? <Link className="Link" to="/Login" > LOG IN </Link> </small>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Signup.propsTypes = {
    UI: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    user: state.user
})

const mapActionsToProps = {
    signupUser
}

export default connect(mapStateToProps, mapActionsToProps)(Signup)