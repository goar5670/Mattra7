import React, { Component } from "react"
import {Link } from "react-router-dom"
import { PropTypes } from 'prop-types'

//Redux
import { connect } from 'react-redux'


const NavBarUtil = (handleChange, authenticated, userId) => {
    if(authenticated)
    {
        return (
            <ul>
                <li> 
                    <div className= "langpick"> 
                        <select onChange={handleChange} name = "language">
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
                <li> <Link to = {`/Profile/${userId}`}> Profile</Link></li>
                <li> <Link to = "/Logout">Logout</Link>  </li>
            </ul>
        )
    }
    else
        return (
            <ul>
                <li> 
                    <div className= "langpick"> 
                        <select onChange={handleChange} name = "language">
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
        )
}

class NavBar extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            language: "arabic",
            authenticated: false,
            userId: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentWillReceiveProps(nextProps)
    {
        this.setState({
            authenticated: nextProps.user.authenticated,
            userId: nextProps.user.userId
        })
    }

    handleChange(event)
    {
        //TODO LANG CHANGE
    }

    render ()
    {
        return (
            <div className="nav">
                <Link to = "/Home">
                    <img src="https://i.ibb.co/NLLVycn/logo2.png" alt="logo" className="logo"/>
                </Link>
                <div className = "nav-list">
                    {NavBarUtil(this.handleChange, this.state.authenticated, this.state.userId)}
                </div>
            </div>
        )
    }
}

NavBar.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(NavBar)