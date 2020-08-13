import React from "react"
import {Link} from "react-router-dom"
function Item(props)
{

    return (
        <Link to={`/Ad/${props.id}`}>
            <div className="item">
                <h3 className="item-title"> {props.item.title} </h3>
                <p className="item-description">{props.item.description} </p>
                <p> Address: {props.item.address} </p>
                <p> Governorate: {props.item.governorate}   Number of rooms: {props.item.rooms}   Unit size: {props.size}
                   Rent fee: {props.item.price}   Nearby university: {props.item.university}</p>
            </div>
        </Link>
    )
}

export default Item