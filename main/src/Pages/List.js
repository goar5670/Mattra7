import React, { Component } from "react"
import {UncontrolledPopover, PopoverBody, PopoverHeader} from "reactstrap"
import axios from "axios"
import PhotoInput from "../Components/PhotoInput.js"
import {Redirect} from "react-router-dom"

import Footer from "../Components/Footer"

// import {endpoint} from "./Components/Vars"


const defaultPicture = "https://i.ibb.co/XCNVgqq/New-Project-1.png";

class ListPage extends Component
{
    constructor(props) {
        super(props)
        this.state = { 
            // id: "",
            title: "",
            description: "",
            pictures: [
                defaultPicture,
                defaultPicture, 
                defaultPicture,
                defaultPicture,
                defaultPicture
            ],
            governorate: "",
            address: "",
            rooms: "",
            size: "",
            price: "",
            university: "",
            redirect: null,
        }
        this.handleUpload = this.handleUpload.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
 
    handleChange(event)
    {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    handleUpload(id, event) {
        var size = event.target.files[0].size/1024;
        if(size > 5*1024)
        {
            alert("File is too big. The limit is 5MB");
        }
        else
        {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0])
            reader.onload = () => {
                if(reader.readyState === 2)
                {
                    this.setState(prev => {
                        const list = prev.pictures.map((item, i) => {
                            if(id == i) return reader.result
                            else return item
                        })
                        return {
                            pictures: list
                        }
                    })
                }
            }
            setTimeout(() => {
                console.log(this.state);
            }, 2000);
        }
    }

    async handleSubmit(event) {
        if(window.token === "-1") alert("You must be logged in to list a place.");
        else
        {
            const headers = {
                Authorization: "Bearer " + window.token
            }
            console.log(headers);
            event.preventDefault()
            const res = await axios.post("/places", {...this.state}, {headers: headers})
            if(res.status == 200) 
            {
                this.state.redirect = 1;
                this.props.history.push('./FindPage')
            }
            console.log(this.state)
        }
    }

    render()
    {
        const temp1 = "< 75"
        const temp2 = "> 250"
        const temp3 = "< 1000"
        const temp4 = "> 3000"
        const temp5 = "> 5"
        const list = ["Select", "Giza", "Cairo"]
        const options = list.map((item, id) => {
            if(id == 0) return <option disabled selected> {item} </option>
            else return <option> {item} </option>
        }) 
        const {redirect} = this.state
        if(redirect) return <Redirect to="./FindPage" />
        return (
            redirect? <Redirect to="./FindPage" />:
            <div className="List">
                <div className="main">
                    <div className="header">
                        <h1> Add a property</h1>
                    </div>
                    <div className="content">
                        <div className= "listing-form">
                            <form onSubmit = {this.handleSubmit}>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td className="label">Title</td>
                                    </tr>
                                    <tr>
                                        <td> 
                                            <input 
                                                type = "text" 
                                                id = "popover-title"
                                                name = "title"
                                                value = {this.state.title}
                                                onChange = {this.handleChange}
                                            />
                                            <UncontrolledPopover  placement="right" target="popover-title" trigger="focus">
                                                <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. 
                                                    Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
                                            </UncontrolledPopover>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="label">Description</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <textarea 
                                                id = "popover-description"
                                                rows = "5" 
                                                cols = "54" 
                                                name = "description"
                                                value = {this.state.description}
                                                onChange = {this.handleChange}
                                            >
                                            </textarea>
                                            <UncontrolledPopover  placement="right" target="popover-description" trigger="focus">
                                                <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. 
                                                    Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
                                            </UncontrolledPopover>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="label">Add pictures</td>
                                    </tr>
                                    <tr id="popover-photo">
                                        <td>
                                            <div className="photos">
                                                <PhotoInput handleChange={this.handleUpload} id = "0" source={this.state.pictures[0]} c="first-photo"/>
                                                <PhotoInput handleChange={this.handleUpload} id = "1" source={this.state.pictures[1]}/>
                                                <PhotoInput handleChange={this.handleUpload} id = "2" source={this.state.pictures[2]}/>
                                                <PhotoInput handleChange={this.handleUpload} id = "3" source={this.state.pictures[3]}/>
                                                <PhotoInput handleChange={this.handleUpload} id = "4" source={this.state.pictures[4]} c="last-photo"/>
                                            </div>
                                        </td>
                                        <UncontrolledPopover  placement="right" target="popover-photo" trigger="hover">
                                            <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. 
                                                Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
                                        </UncontrolledPopover>
                                    </tr>
                                    <tr>
                                        <td className="label">Governorate</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <select id="popover-governorate" name = "governorate" onChange = {this.handleChange}>
                                                <option value="Giza">Giza</option>
                                                <option value="Cairo">Cairo</option>
                                                <option value="Alexandria">Alexandria</option>
                                            </select>   
                                        </td>
                                        <UncontrolledPopover  placement="right" target="popover-governorate" trigger="hover">
                                            <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. 
                                                Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
                                        </UncontrolledPopover>
                                    </tr>
                                    <tr>
                                        <td className="label">Address</td>
                                    </tr>
                                    <tr>
                                        <td> 
                                            <input id="popover-address" type="text" name = "address" value = {this.state.address} onChange = {this.handleChange}/> 
                                            <UncontrolledPopover  placement="right" target="popover-address" trigger="focus">
                                                <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. 
                                                    Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
                                            </UncontrolledPopover>
                                        </td>
                                        
                                    </tr>
                                    <tr>
                                        <td><hr /></td>
                                    </tr>
                                    <tr>
                                        <td className="label">Number of rooms</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <select id="popover-rooms" name = "rooms" onChange = {this.handleChange}>
                                                <option valye="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value={temp5}> {temp5} </option>
                                            </select>
                                            <UncontrolledPopover  placement="left" target="popover-rooms" trigger="hover">
                                                <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. 
                                                    Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
                                            </UncontrolledPopover>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="label">Unit size</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <select id="popover-size" className="size" name = "size" onChange = {this.handleChange}>
                                                <option value={temp1}> {temp1} </option>
                                                <option value="75 - 100">75 - 100</option>
                                                <option value="100 - 150">100 - 150</option>
                                                <option value="150 - 200">150 - 200</option>
                                                <option value="200 - 250">200 - 250</option>
                                                <option value={temp2}> {temp2}</option>
                                            </select>
                                            <UncontrolledPopover  placement="left" target="popover-size" trigger="hover">
                                                <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. 
                                                    Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
                                            </UncontrolledPopover>
                                            
                                        </td>
                                        <td className="m2"><p>m<span>2</span></p></td>
                                    </tr>
                                    <tr>
                                        <td className="label">Rent fee</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <select id="popover-price" className="price" name = "price" onChange = {this.handleChange}>
                                                <option value={temp3}> {temp3} </option>
                                                <option value="1000 - 1500">1000 - 1500</option>
                                                <option value="1500 - 2000">1500 - 2000</option>
                                                <option value="2000 - 2500">2000 - 2500</option>
                                                <option value="2500 - 3000">2500 - 3000</option>
                                                <option value={temp4}> {temp4} </option>
                                            </select>
                                            <UncontrolledPopover  placement="left" target="popover-price" trigger="hover">
                                                <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. 
                                                    Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
                                            </UncontrolledPopover>
                                            
                                        </td>
                                        <td className="egp"><p>EGP/month</p></td>
                                    </tr>
                                    <tr>
                                        <td className="label">Nearby university</td>
                                    </tr>
                                    <tr>
                                        <td id="popover-university">
                                            <select name = "university" onChange = {this.handleChange}>
                                                <option value="AUC">AUC</option>
                                                <option value="BUE">BUE</option>
                                                <option value="GUC">GUC</option>
                                                <option value="MUST">MUST</option>
                                                <option value="MSA">MSA</option>
                                                <option value="AAST">AAST</option>
                                                <option value="Other">Other</option>
                                                <option value="Non-applicable">Non-applicable</option>
                                            </select>
                                            <UncontrolledPopover  placement="left" target="popover-university" trigger="hover">
                                                <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. 
                                                    Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
                                            </UncontrolledPopover>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type = "submit" value = "List it" />
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default ListPage