import React, { Component } from "react"
import {BrowserRouter as Router, Route} from "react-router-dom"

import SignupPage from "./Pages/SignupPage"
import LoginPage from "./Pages/LoginPage"
import LangPage from "./Pages/LangPage"
import HomePage from "./Pages/HomePage"
import HelpPage from "./Pages/HelpPage"
import ListPage from "./Pages/ListPage"
import FindPage from "./Pages/FindPage"
import AdPage from "./Pages/AdPage"

window.$lang = "english"

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
    // handleChange(event)
    // {
    //     this.setState(
    //         {
    //             flag: "home",
    //             [event.target.name]: event.target.value
    //         }
    //     )
    //     setTimeout(() => {
    //         console.log(this.state)
    //     }, 1500);
    // }

    // handleChange(event)
    // {
    //     console.log(this.props)
    //     this.props.history.push(`/${event.target.name}`);
    // }

    render()
    {
        return (
            <div>
                <Router>
                    <div>
                        <Route exact path="/" component={LangPage} />
                        <Route exact path="/HomePage" component={HomePage} />
                        <Route exact path="/LoginPage" component={LoginPage} />
                        <Route exact path="/SignupPage" component={SignupPage} />
                        <Route exact path="/HelpPage" component={HelpPage} />
                        <Route exact path="/ListPage" component={ListPage} />
                        <Route exact path="/FindPage" component={FindPage} />
                        <Route exact path="/Ad/:itemId" component={AdPage} />
                    </div>
                </Router>
            </div>
        )
    }
}

export default App