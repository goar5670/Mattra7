import React, { Component } from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

// Pages
import * as pages from "./Pages"

//Components
import NavBar from "./Pages/Components/NavBar"
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
                        <Route exact path="/" component={pages.LangPage} />
                        <NavBar />
                    </Switch>
                    <Switch>
                        <Route exact path="/HomePage" component={pages.HomePage} />
                        <Route exact path="/LoginPage" component={pages.LoginPage} />
                        <Route exact path="/SignupPage" component={pages.SignupPage} />
                        <Route exact path="/HelpPage" component={pages.HelpPage} />
                        <Route exact path="/ListPage" component={pages.ListPage} />
                        <Route exact path="/FindPage" component={pages.FindPage} />
                        <Route exact path="/Ad/:itemId" component={pages.AdPage} />
                        <Route exact path="/Signup/Redirect" component={pages.SignupRedirect} />
                        <Route exact path="/LogoutPage" component={pages.LogoutPage} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App