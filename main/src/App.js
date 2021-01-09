import React, { Component } from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

// Pages
import {
  Lang, Home, Login, Signup, Help, List,
  Find, Ad, SignupRedirect, Logout  
}  from "./Pages"

//Components
import NavBar from "./Components/NavBar"
import Nav from "reactstrap/lib/Nav"

//Glboal Vars
window.lang = "english"
window.token = "-1"

class App extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            flag: "lang",
            language: ""
        }
    }

    render()
    {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Lang} />
                        <NavBar />
                    </Switch>
                    <Switch>
                        <Route exact path="/Home" component={Home} />
                        <Route exact path="/Login" component={Login} />
                        <Route exact path="/Signup" component={Signup} />
                        <Route exact path="/Help" component={Help} />
                        <Route exact path="/List" component={List} />
                        <Route exact path="/Find" component={Find} />
                        <Route exact path="/Ad/:itemId" component={Ad} />
                        <Route exact path="/Signup/Redirect" component={SignupRedirect} />
                        <Route exact path="/Logout" component={Logout} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App