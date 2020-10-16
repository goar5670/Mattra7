import React, { Component, useState, useEffect} from "react"
import NavBar from "./Components/NavBar"
import axios from "axios"
import Item from "./Components/Item"
import PhotoInput from "./Components/PhotoInput"
import Loading from "./Components/Loading"
const endpoint = "https://jsonbox.io/box_7da96f8e3be60f9bb113";

function FindPage()
{

    const temp1 = "< 75"
    const temp2 = "> 250"
    const temp3 = "< 1000"
    const temp4 = "> 3000"
    const temp5 = "> 5"

    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([]);

    // const data = [
    //     {title:"Sample title", description: "Sample description", governorate: "gov",
    //      rooms: "4", size: "250-300", price: "2500-3000", university: "AUC"},
    //     {title:"First item but not really first", description: "Just a dummy desc to see what's working"},
    //     {title:"Actually third item", description : "apartment with 3 rooms nearby GUC for students"}
    // ]

    // const results = data.map((cur) => {
    //     return <Item item={cur}/>
    // })
    const fetchItems = async () => {
        const {status, data} = await axios.get(endpoint + "/todos").then(
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        );
        if(status === 200)
        setItems(data)
        console.log(status, data)
    }
    useEffect(() => {
        fetchItems();
    }, [])
    
    return (
        <div class="Find">
            <div class="main">
                <NavBar />
                <div class="header">
                    <h1> Find a place</h1>
                </div>
                <div class= "filter">
                    <form>
                        <table>
                            <tr>
                                <td>
                                    <select>
                                            <option value="" disabled selected>Governorate</option>
                                            <option>Giza</option>
                                            <option>Cairo</option>
                                            <option>Alexandria</option>
                                        </select>
                                </td>
                                <td>
                                    <select>
                                            <option value="" disabled selected>Number of rooms</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>{temp5}</option>
                                    </select>
                                </td>
                                <td>
                                    <select>
                                            <option value="" disabled selected>Unit size</option>
                                            <option>{temp1}</option>
                                            <option>75 - 100</option>
                                            <option>100 - 150</option>
                                            <option>150 - 200</option>
                                            <option>200 - 250</option>
                                            <option>{temp2}</option>
                                        </select>
                                </td>
                                <td>
                                    <select>
                                            <option value="" disabled selected>Rent fee</option>
                                            <option>{temp3}</option>
                                            <option> 1000 - 1500</option>
                                            <option> 1500 - 2000</option>
                                            <option> 2000 - 2500</option>
                                            <option> 2500 - 3000</option>
                                            <option>{temp4}</option>
                                        </select>
                                </td>
                                <td>
                                    <select>
                                            <option value="" disabled selected>Nearby university</option>
                                            <option>AUC</option>
                                            <option>BUE</option>
                                            <option>GUC</option>
                                            <option>MUST</option>
                                            <option>MSA</option>
                                            <option>AAST</option>
                                            <option>Other</option>
                                            <option>Non-applicable</option>
                                        </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" class="search-bar" placeholder="Search"/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type = "submit" value = "Go" />
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
                <div class="content">
                    <div class="results">
                        {loading===true? 
                            <div> <Loading /> </div>:
                            items.map((cur) => {
                                return <Item 
                                    item={cur.item} id={cur._id}
                                />
                            })
                        }
                        
                    </div>
                </div>
                <div class="footer">
                    &copy; 2020 Mattra7, Inc. All rights reserved. 
                </div>
            </div>
        </div>
    )
}

export default FindPage