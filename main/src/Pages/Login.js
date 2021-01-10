import React, { Component } from "react"
import {Link} from "react-router-dom"
import PropTypes from 'prop-types'

//MUI STUFF
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'

//Redux
import { loginUser } from "../Redux/actions/userActions"
import { connect } from 'react-redux'

class Login extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: {},
            loading: false
        }
        
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
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
    handleSubmit(event) {
        event.preventDefault()
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history);
    }
    render()
    {
        const {errors, loading} = this.state;
        return (
            <div className="Login">
                <div className="main">
                    <div className="content">
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
                                    error={errors.email ? true: false}
                                    helperText={errors.email}     
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
                                    error={errors.password? true: false}
                                    helperText={errors.password}
                                />
                                {errors.general && (
                                <Typography variant="body2" className="customError">
                                    {errors.general}
                                </Typography>
                                )}
                                <Button type = "submit" disabled={loading}>
                                    {loading? <CircularProgress color="white" /> : "Log in" } 
                                </Button>
                                <small> Don't have an account? <Link className="Link" to="/Signup" > SIGN UP </Link> </small>
                            </form>
                        </div>                        
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        UI: state.UI
    }
};

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(Login)