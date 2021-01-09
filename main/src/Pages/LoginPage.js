import React, { Component } from "react"
import LoginForm from "./Components/LoginForm"

class LoginPage extends Component
{
    
    render()
    {
        return (
            <div class="Login">
                <div class="main">
                    <div class="content">
                        <LoginForm />
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage