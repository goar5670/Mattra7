import React, { Component } from "react"

//Components
import Footer from "../Components/Footer"

//MUI
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';


class Profile extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {

        }
    }

    render()
    {
        return (
            <div className = "Profile">
                <div className = "main">
                    <Grid container spacing={2}>
                        {/* <Grid item xs={12}>
                            <Grid>

                            </Grid>
                        </Grid> */}
                        <Grid item xs={12}>
                            <Grid container justify="center" spacing={10}>
                                <Grid key='0' item className = 'placesList'>

                                </Grid>
                                <Grid key='1' item className = 'Paper'>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>    
                </div>
                <Footer />
            </div>
        )
    }
}

export default Profile