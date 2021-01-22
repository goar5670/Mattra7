import React, { Component } from "react"
import {Link} from "react-router-dom"

//MUI
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from "@material-ui/core/Typography";

class PlaceCard extends Component
{
    constructor(props)
    {
        super();
    }


    render()
    {
        let defaultPicture = "https://i.ibb.co/PQNhrZg/no-place.png"
        if(this.props.place.pictures.length)
            defaultPicture = this.props.place.pictures[0];
        return (
            // <div className="placeCard">
                <Link className = 'placeCard-link' to={`/Ad/${this.props.place.id}`} >
                    <Card className="placeCard" elevation={1}>
                        <div className='image-container'>
                            <img className="image" src={defaultPicture}/>
                        </div>

                        <CardContent className='details'>
                            <div className = 'text'>
                                <Typography className = 'title' variant="h6">
                                    {this.props.place.title}
                                </Typography>
                                <Typography className = 'description'>
                                    {this.props.place.description}
                                </Typography>
                                <Typography className = 'address'>
                                    Address: {this.props.place.address}
                                </Typography>
                            </div>
                            <div className = 'choices'>
                                <Typography className = 'governorate'>
                                    Governorate: {this.props.place.governorate}
                                </Typography>
                                <Typography className = 'size'>
                                    Unit size: {this.props.place.size}
                                </Typography>
                                <Typography className = 'rooms'>
                                    Number of Rooms: {this.props.place.rooms}
                                </Typography>
                                <Typography className = 'price'>
                                    Price range: {this.props.place.price}
                                </Typography>
                                <Typography className='university'>
                                    Nearby university: {this.props.place.university}
                                </Typography>

                            </div>
                        </CardContent>
                        


                        {/* <h3 className="placeCard-title"> {this.props.placeCard.title} </h3>
                        <p className="placeCard-description">{this.props.placeCard.description} </p>
                        <p> Address: {this.props.placeCard.address} </p>
                        <p> Governorate: {this.props.placeCard.governorate}   Number of rooms: {this.props.placeCard.rooms}   Unit size: {this.props.placeCard.size}
                        Rent fee: {this.props.placeCard.price}   Nearby university: {this.props.placeCard.university}</p> */}
                    </Card>
                </Link>
            // </div>
        )
    }
}

export default PlaceCard