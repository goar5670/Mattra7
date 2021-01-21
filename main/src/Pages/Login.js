import React, { Component } from "react"
import {Link} from "react-router-dom"
import PropTypes from 'prop-types'

//MUI
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert'
import Card from '@material-ui/core/Card'

//Redux
import { loginUser } from "../Redux/actions/userActions"
import { connect } from 'react-redux'
import store from '../Redux/store'
import {CLEAR_SNACKBAR } from '../Redux/types'

class Login extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: {},
            loading: false,
            open: false
        }
        
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    componentWillMount()
    {
        if(this.props.UI.snackbar)
        {
            this.setState({
                open: true
            })
            store.dispatch({ type: CLEAR_SNACKBAR })
        }
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

    handleClose = (event, reason) => {
        this.setState({
            open: false
        })
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
                    <Snackbar open={this.state.open} autoHideDuration={4000} onClose={this.handleClose}>
                        <Alert onClose={this.handleClose} severity="error">
                            You must be logged in to view this page
                        </Alert>
                    </Snackbar>
                    <div className="content">
                        <Card className="rect" elevation={5}>
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
                        </Card>
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
    loginUser,
}

export default connect(mapStateToProps, mapActionsToProps)(Login)