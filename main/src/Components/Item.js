import React from "react"
import {Link} from "react-router-dom"
function Item(props)
{
    return (
        <div className="item">
            <Link to={`/Ad/${props.item.id}`} target='_blank'>
                <h3 className="item-title"> {props.item.title} </h3>
                <p className="item-description">{props.item.description} </p>
                <p> Address: {props.item.address} </p>
                <p> Governorate: {props.item.governorate}   Number of rooms: {props.item.rooms}   Unit size: {props.item.size}
                   Rent fee: {props.item.price}   Nearby university: {props.item.university}</p>
            </Link>
        </div>
    )
}

export default Item