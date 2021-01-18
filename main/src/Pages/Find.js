import React, { Component, useState, useEffect} from "react"
import axios from "axios"

//Components
import Item from "../Components/Item"
import Loading from "../Components/Loading"
import Footer from "../Components/Footer"

//MUI
import withStyles from '@material-ui/core/styles/withStyles'
import muiAccordion from "@material-ui/core/Accordion"
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography'

const Accordion = withStyles({
    root: {
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&$expanded': {
            margin: '0px 0px 80px',
            paddingTop: '0px'
        },
    },
    expanded: {},
})(muiAccordion);



function Find()
{

    const temp1 = "< 75"
    const temp2 = "> 250"
    const temp3 = "< 1000"
    const temp4 = "> 3000"
    const temp5 = "> 5"

    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState({
        governorate: "0",
        rooms: "0",
        size: "0",
        price: "0",
        university: "0",
    });


    const fetchItems = () => {
        return axios.get('/places', {params: filter}).then((res) => {
            setTimeout(() => {
                if(res.status === 200)
                { 
                    setItems(res.data.places)                
                    console.log(res.data.places)
                    setLoading(false)
                }
                else console.log(res.status);
            })
        }) .catch(e => {
            console.log(e);
        });
    }
    useEffect(() => {
        fetchItems();
    }, [])
    
    const handleChange = (event) => {
        setFilter(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchItems();
    }

    return (
        <div className="Find">
            <div className="main">
                <div className="header">
                    <h1> Find a place</h1>
                </div>
                <Accordion className='filter'>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                    </AccordionSummary>
                    <AccordionDetails>
                        <form>
                            <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <select name="governorate" value = {filter.governorate} onChange = {handleChange} defaultValue="0">
                                            <option value="0" disabled>Governorate</option>
                                            <option value="Giza">Giza</option>
                                            <option value="Cairo">Cairo</option>
                                            <option value="Alexandria">Alexandria</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select name="rooms" value = {filter.rooms} onChange = {handleChange} defaultValue="0">
                                            <option value="0" disabled>Number of rooms</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value={temp5}>{temp5}</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select name="size" value = {filter.size} onChange = {handleChange} defaultValue="0">
                                            <option value="0" disabled>Unit size</option>
                                            <option value={temp1}> {temp1} </option>
                                            <option value="75 - 100">75 - 100</option>
                                            <option value="100 - 150">100 - 150</option>
                                            <option value="150 - 200">150 - 200</option>
                                            <option value="200 - 250">200 - 250</option>
                                            <option value={temp2}> {temp2}</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select name="price" value = {filter.price} onChange = {handleChange} defaultValue="0">
                                            <option value="0" disabled>Rent fee</option>
                                            <option value={temp3}> {temp3} </option>
                                            <option value="1000 - 1500">1000 - 1500</option>
                                            <option value="1500 - 2000">1500 - 2000</option>
                                            <option value="2000 - 2500">2000 - 2500</option>
                                            <option value="2500 - 3000">2500 - 3000</option>
                                            <option value={temp4}> {temp4} </option>
                                        </select>
                                    </td>
                                    <td>
                                        <select name="university" value = {filter.university} onChange = {handleChange} defaultValue="0">
                                            <option value="0" disabled>Nearby university</option>
                                            <option value="AUC">AUC</option>
                                            <option value="BUE">BUE</option>
                                            <option value="GUC">GUC</option>
                                            <option value="MUST">MUST</option>
                                            <option value="MSA">MSA</option>
                                            <option value="AAST">AAST</option>
                                            <option value="Other">Other</option>
                                            <option value="Non-applicable">Non-applicable</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input onSubmit={handleSubmit} type="submit" value = "Go" />
                                    </td>
                                </tr>
                            </tbody>
                            </table>
                        </form>
                    </AccordionDetails>
                </Accordion>
                <div className="content">
                    <div className="results">
                        {loading? 
                            <Loading /> :
                            items.map((cur, i) => {
                                return <Item 
                                    item={cur} key={i}
                                />
                            })
                        }
                        
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Find