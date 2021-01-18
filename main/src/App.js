import React, { Component } from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import axios from 'axios'
import jwtDecode from 'jwt-decode';

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
import Profile from './Pages/Profile'
import NotFound from './Pages/NotFound'

//Components
import NavBar from "./Components/NavBar"
import UnAuthRoute from "./Components/UnAuthRoute"
import AuthRoute from './Components/AuthRoute'

const token = localStorage.FBIdToken;
if(token){
    const decodedToken = jwtDecode(token);
    if(decodedToken.exp * 1000 < Date.now())
    {
        window.location.href = '/Login'
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
                                <UnAuthRoute exact path="/Login" component={Login}/>
                                <UnAuthRoute exact path="/Signup" component={Signup} />
                                <Route exact path="/Home" component={Home} />
                                <Route exact path="/Help" component={Help} />
                                <AuthRoute exact path="/List" component={List} />
                                <Route exact path="/Find" component={Find} />
                                <Route exact path="/Ad/:itemId" component={Ad} />
                                <Route exact path="/Logout" component={Logout} />
                                <Route exact path='/Profile/:userId' component={Profile} />
                                <Route component={NotFound} />
                            </Switch>
                        </Router>
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

export default App