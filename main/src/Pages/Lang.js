import React, { Component } from "react"
import { Link } from 'react-router-dom'
class LangPage extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            language: "",
            // handleChange: this.props.handleChange
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event)
    {
        // this.setState(
        //     {
        //         flag: true
        //     }
        // )
        this.props.history.push(`/${event.target.name}`);
    }

    

    // componentDidMount()
    // {
    //     console.log(this.props)
    // }

    render()
    {
        return (
            <div className="Lang">
                <div className="langmain">
                    <img src="https://i.ibb.co/rcYwH8h/logo3-01.png" alt="logo" className="logo"/><br/>
                    <h1> Mattra7  <span className= "arabic"> — مطرح </span> </h1>
                    <h3> Welcome to Mattra7, the first Egyptian rental service for students</h3>
                </div>
                <div className="langpick">
                    <form className="langmenu">
                        <select name="Home" value = {this.state.language} onChange = {this.handleChange}>
                            <option className="arabic" value="" disabled>اختر اللغة</option>
                            <option className="arabic" value="arabic">
                                العربية
                            </option>
                            <option value="english">
                                English
                            </option>
                        </select>
                    </form>
                </div>
            </div>
        )
    }
}


export default LangPage