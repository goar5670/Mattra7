import React, { Component } from "react"

class PhotoInput extends Component {
    
    constructor(props)
    {
        super(props)
        this.state = {
            source: this.props.source
        }
    }

    
    render()
    {
        return (
            <div className = {this.props.c}>
                <div className = "PhotoInput">
                    <input 
                        type = "file"
                        accept = "image/*"
                        onChange = {(event) => this.props.handleChange(this.props.id, event)}
                        ref = {fileInput => this.fileInput = fileInput}
                    />
                    <img onClick = {() => this.fileInput.click()} src={this.props.source}/>
                </div>
            </div>
        )
    }
}

export default PhotoInput