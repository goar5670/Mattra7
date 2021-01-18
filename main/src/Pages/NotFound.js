import React, { Component } from 'react'
import Footer from '../Components/Footer'

class NotFound extends Component
{
    constructor()
    {
        super();
    }

    render()
    {
        return (
            <div className = 'NotFound'>
                <div className = 'main'>
                    <h2> The page you're looking for does not exist </h2> 
                </div>
                <Footer />
            </div>
        )
    }
}

export default NotFound