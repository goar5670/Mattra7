import React, { Component } from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import axios from 'axios'

//Redux
import { Provider } from 'react-redux'
import store from './Redux/store'
import { SET_AUTHENTICATED } from './Redux/types'
import { logoutUser, getUserData } from './Redux/actions/userActions'

// Pages
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import Lang from "./Pages/Lang"
import Home from "./Pages/Home"
import Help from "./Pages/Help"
import List from "./Pages/List"
import Find from "./Pages/Find"
import Ad from "./Pages/Ad"
import Logout from "./Pages/Logout"
import SignupRedirect from "./Pages/SignupRedirect"
import jwtDecode from 'jwt-decode';

//Components
import NavBar from "./Components/NavBar"
import AuthRoute from "./Components/AuthRoute"

const token = localStorage.FBIdToken;
if(token){
    const decodedToken = jwtDecode(token);
    if(decodedToken.exp * 1000 < Date.now())
    {
        window.location.href = '/login'
        store.dispatch(logoutUser());
    }
    else
    {
        store.dispatch({
            type: SET_AUTHENTICATED
        });
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserData());
    }
}

class App extends Component
{
    render()
    {
        return (
            <Provider store = {store}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Lang} />
                        <Router>
                            <NavBar />
                            <Switch>
                                <AuthRoute exact path="/Login" component={Login}/>
                                <AuthRoute exact path="/Signup" component={Signup} />
                                <Route exact path="/Home" component={Home} />
                                <Route exact path="/Help" component={Help} />
                                <Route exact path="/List" component={List} />
                                <Route exact path="/Find" component={Find} />
                                <Route exact path="/Ad/:itemId" component={Ad} />
                                <Route exact path="/Signup/Redirect" component={SignupRedirect} />
                                <Route exact path="/Logout" component={Logout} />
                            </Switch>
                        </Router>
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

export default App