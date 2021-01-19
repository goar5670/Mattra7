import React, { Component, Fragment } from "react"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'

//Components
import Footer from "../Components/Footer"
import PFP from '../Components/PFP'
import Item from '../Components/Item'
import Loading from '../Components/Loading'

//MUI
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from "@material-ui/core/Typography";
import Skeleton from '@material-ui/lab/Skeleton';


//MUI Icons
import EmailIcon from '@material-ui/icons/Email';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import EditIcon from '@material-ui/icons/Edit';

class Profile extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            loading: true,
            user: { 
                
            }
        }
    }

    componentWillMount = () => {
        this.setState({
            loading: true
        })
        axios.get(`/user/${this.props.match.params.userId}`)
        .then(res => {
            this.setState({
                user: res.data,
                loading: false
            });
        }).catch(e => {
            window.location.href = '/NotFound';
            console.log(e);
        })
    }

    render()
    {
        const { userId } = this.props.match.params;
        const { loading, user } = this.state
        const { places } = user
        let ProfileMarkup = !loading? 
        (
        <div className = "Profile">
            <div className = "main">
                <div className = 'cover'/>
                <div className = 'header'>
                    <PFP src={ user.imageUrl }/>
                    <Typography className = 'full-name'> 
                        {user.firstName + " " + user.lastName} 
                    </Typography>
                    <Grid container className = 'info'>
                        <Grid item>
                            <EmailIcon color = 'primary'/>
                        </Grid> 
                        <Grid item>
                            <span className = 'text'> {`${user.email}`} </span>
                        </Grid>
                        {user.phone &&
                            <Fragment>
                                <Grid item>
                                    <PhoneIphoneIcon color = 'primary'/>
                                </Grid> 
                                <Grid item>
                                    <span className = 'text'> {`${user.phone}`} </span>
                                </Grid>
                            </Fragment>
                        }
                        {(this.props.authUser.userId === userId) &&
                            <Grid item className = 'edit'>
                                <Button component={Link} to="#"> Edit Profile Info</Button>
                            </Grid>
                        }  
                    </Grid>
                </div> 
                {/* <Card className = 'contact-info' elevation={5}>
                        
                </Card> */}
                <div className = 'placesList'>
                    {places.length? 
                    places.map((cur, i) => {
                                return <Item 
                                    item={cur} key={i}
                                />
                            })
                            :
                    <div>
                        The user has no listed places
                    </div>
                    }
                </div>
            </div>
            <Footer />
        </div>
        )
        :
        (
        <div className = "Profile">
            <div className = "main">
                <div className = 'cover'/>
                <div className = 'header'>
                    <div className = 'container'>
                        <Skeleton className = 'PFP-skeleton' variant = "circle"/>
                    </div>
                    <Skeleton className = 'full-name' variant="rect" width={200} height={20} />
                    <Skeleton className = 'info' variant="rect" width={500} height={20} />
                    <Skeleton className = 'edit-skeleton' variant="rect" width={150} height={30} />

                </div>
                {/* <Card className = 'contact-info' elevation={5}>
                        
                </Card> */}
                <Loading />
            </div>
            <Footer />
        </div>
        );
        return ProfileMarkup;
    }
}

const mapStateToProps = (state) => {
    return {
        authUser: state.user
    }
}

export default connect(mapStateToProps)(Profile)