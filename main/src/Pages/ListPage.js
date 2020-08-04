import React, { Component } from "react"

import {UncontrolledPopover, PopoverBody, PopoverHeader} from "reactstrap"
// import "bootstrap/dist/css/bootstrap.css"
import axios from "axios"

import NavBar from "./Components/NavBar.js"
import PhotoInput from "./Components/PhotoInput.js"

const endpoint = "https://jsonbox.io/box_0bb53cd4d9fe6af89921";
const defaultPicture = "https://i.ibb.co/XCNVgqq/New-Project-1.png";

class ListPage extends Component
{
    constructor(props) {
        super(props);
        this.state = { 
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
            university: ""

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
        if(size >= 5*1024)
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
        event.preventDefault()
        const res = await axios.post(endpoint + "/todos", {item:this.state})
        console.log(this.state)
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
        return (

            <div class="List">
                <div class="main">
                    <NavBar />
                    <div class="header">
                        <h1> Add a property</h1>
                    </div>
                    <div class="content">
                        <div class= "listing-form">
                            <form onSubmit = {this.handleSubmit}>
                                <table>
                                    <tr>
                                        <td class="label">Title</td>
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
                                        <td class="label">Description</td>
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
                                        <td class="label">Add pictures</td>
                                    </tr>
                                    <tr>
                                        <td id="popover-photo">
                                            <div className="photos" >
                                                <PhotoInput handleChange = {this.handleUpload} id = "0" source={this.state.pictures[0]} c="first-photo"/>
                                                <PhotoInput handleChange = {this.handleUpload} id = "1" source={this.state.pictures[1]}/>
                                                <PhotoInput handleChange = {this.handleUpload} id = "2" source={this.state.pictures[2]}/>
                                                <PhotoInput handleChange = {this.handleUpload} id = "3" source={this.state.pictures[3]}/>
                                                <PhotoInput handleChange = {this.handleUpload} id = "4" source={this.state.pictures[4]} c="last-photo"/>
                                            </div>
                                            <UncontrolledPopover  placement="right" target="popover-photo" trigger="hover">
                                                <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. 
                                                    Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
                                            </UncontrolledPopover>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="label">Governorate</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <select name = "governorate" onChange = {this.handleChange}>
                                                <option value="Giza">Giza</option>
                                                <option value="Cairo">Cairo</option>
                                                <option value="Alexandria">Alexandria</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="label">Address</td>
                                    </tr>
                                    <tr>
                                        <td> <input type="text" name = "address" value = {this.state.address} onChange = {this.handleChange}/> 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><hr /></td>
                                    </tr>
                                    <tr>
                                        <td class="label">Number of rooms</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <select name = "rooms" onChange = {this.handleChange}>
                                                <option valye="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6"> {temp5} </option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="label">Unit size</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <select class="size" name = "size" onChange = {this.handleChange}>
                                                <option value="1"> {temp1} </option>
                                                <option value="2">75 - 100</option>
                                                <option value="3">100 - 150</option>
                                                <option value="4">150 - 200</option>
                                                <option value="5">200 - 250</option>
                                                <option value="6"> {temp2}</option>
                                            </select>
                                            
                                        </td>
                                        <td class="m2"><p>m<span>2</span></p></td>
                                    </tr>
                                    <tr>
                                        <td class="label">Rent fee</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <select class="price" name = "price" onChange = {this.handleChange}>
                                                <option value="1"> {temp3} </option>
                                                <option value="2"> 1000 - 1500</option>
                                                <option value="3"> 1500 - 2000</option>
                                                <option value="4"> 2000 - 2500</option>
                                                <option value="5"> 2500 - 3000</option>
                                                <option value="6"> {temp4} </option>
                                            </select>
                                            
                                        </td>
                                        <td class="egp"><p>EGP/month</p></td>
                                    </tr>
                                    <tr>
                                        <td class="label">Nearby university</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <select name = "university" onChange = {this.handleChange}>
                                                <option value="1">AUC</option>
                                                <option value="2">BUE</option>
                                                <option value="3">GUC</option>
                                                <option value="4">MUST</option>
                                                <option value="5">MSA</option>
                                                <option value="6">AAST</option>
                                                <option value="7">Other</option>
                                                <option value="8">Non-applicable</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type = "submit" value = "List it" />
                                        </td>
                                    </tr>
                                </table>
                            </form>
                        </div>
                    </div>
                    <div class="footer">
                        &copy; 2020 Mattra7, Inc. All rights reserved. 
                    </div>
                </div>
            </div>
        )
    }
}

export default ListPage