import React, { Component } from "react"
import {BrowserRouter as Router, Route} from "react-router-dom"


import HomePage from "./Pages/HomePage"
import LoginPage from "./Pages/LoginPage"
import LangPage from "./Pages/LangPage"
import SignupPage from "./Pages/SignupPage"
import HelpPage from "./Pages/HelpPage"
import ListPage from "./Pages/ListPage"
import FindPage from "./Pages/FindPage"

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
        // this.handleChange = this.handleChange.bind(this)
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
                        <Route exact path="/HomePage" component={HomePage} language={this.state.language} />
                        <Route exact path="/LoginPage" component={LoginPage} />
                        <Route exact path="/SignupPage" component={SignupPage} />
                        <Route exact path="/HelpPage" component={HelpPage} />
                        <Route exact path="/ListPage" component={ListPage} />
                        <Route exact path="/FindPage" component={FindPage} />
                    </div>
                </Router>
            </div>
        )
    }
}

export default App