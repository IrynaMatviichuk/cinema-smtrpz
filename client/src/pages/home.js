import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

import Screening from '../components/Screening';
import Profile from '../components/Profile';


class home extends Component {
    constructor() {
        super();
        this.state = {
            screenings: null
        }
    }

    componentDidMount() {
        axios.get('/screening/select/all')
            .then(res => {
                this.setState({
                    screenings: res.data
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        let screenings = this.state.screenings ? (
        this.state.screenings.map(screening => <Screening key={screening.screening_id} screening={screening}/>)
        ) : <p>Loading ...</p>;
        return (
            <Grid container spacing={16}>
                <Grid item sm/>
                <Grid item sm/>
                <Grid item sm/>
                <Grid item sm={8} xs={12}>
                    {screenings}
                </Grid>
                {/* <Grid item sm/> */}
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
            </Grid>
        );
    }
}


export default home;