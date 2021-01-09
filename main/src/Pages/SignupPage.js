import React, { Component } from "react"
import SingupForm from "./Components/SignupForm"

class SignupPage extends Component
{
    

    render()
    {
        return (
            <div className = "Signup">
                <div className = "main">
                    <div className = "content">
                        <SingupForm />
                    </div>
                </div>
            </div>
        )
    }
}


export default SignupPage