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
import LogoutPage from "./Pages/LogoutPage"
import SignupRedirect from "./Pages/SignupRedirect"

window.lang = "english"
window.token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjY5NmFhNzRjODFiZTYwYjI5NDg1NWE5YTVlZTliODY5OGUyYWJlYzEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbWF0dHJhNy1jNjg5YiIsImF1ZCI6Im1hdHRyYTctYzY4OWIiLCJhdXRoX3RpbWUiOjE2MDc3MzAxNTYsInVzZXJfaWQiOiIyUFQzdWYxQklFWGhPR3FHbjFvT2tZckl5SEcyIiwic3ViIjoiMlBUM3VmMUJJRVhoT0dxR24xb09rWXJJeUhHMiIsImlhdCI6MTYwNzczMDE1NiwiZXhwIjoxNjA3NzMzNzU2LCJlbWFpbCI6ImJsN2FAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImJsN2FAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Rg_fO-mQEjKT-CdU3xiFkFoLf2w8ETptkWH7tQ3MeiaPnuXDip2OfPitkekVyxPXoaJDSl3pK4iB2-Gb9l9B72maphiWMmnPkqwBQvjuzhbrLe5aFBzwzZS2goGSFszcScm1Lvwt59P5_RT9bS731_YLoCwGwawb2cWQQflbrL_XRJX2ckO70NoszNp7OActccy35K9I1cW-d44yD2uEhmz1LTcw6vvDe1PP1GoFCBwB4S7JVrUn7RkFcQfry4fxIuI9H6qJ_vYSDAPSWsmXA44b0A5NA1EjAy00L91ZEHuLkMWr2hCp1gk2j4QvIC57NdvPKy771ktn5ksoMd8WwA"
window.endpoint = "http://localhost:5000/mattra7-c689b/europe-west/api"
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
                    <div>
                        <Route exact path="/" component={LangPage} />
                        <Route exact path="/HomePage" component={HomePage} />
                        <Route exact path="/LoginPage" component={LoginPage} />
                        <Route exact path="/SignupPage" component={SignupPage} />
                        <Route exact path="/HelpPage" component={HelpPage} />
                        <Route exact path="/ListPage" component={ListPage} />
                        <Route exact path="/FindPage" component={FindPage} />
                        <Route exact path="/Ad/:itemId" component={AdPage} />
                        <Route exact path="/Signup/Redirect" component={SignupRedirect} />
                        <Route exact path="/LogoutPage" component={LogoutPage} />
                    </div>
                </Router>
            </div>
        )
    }
}

export default App