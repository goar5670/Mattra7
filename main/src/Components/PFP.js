import React, { Component } from "react"

class PFP extends Component {
    
    constructor(props)
    {
        super(props)
        this.state = {
            
        }
    }

    componentDidMount = () => {

    }

    render()
    {
        return (
            <div className='PFP'>
                <span className='container'>
                    <img src={this.props.src}/>
                </span>
            </div>
        )
    }
}

export default PFP