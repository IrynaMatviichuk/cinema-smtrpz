import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import Screening from '../components/Screening';
import Profile from '../components/Profile';

// Redux
import { connect } from 'react-redux';
import { getScreenings } from '../redux/actions/dataActions';


class home extends Component {
    componentDidMount() {
        this.props.getScreenings();
    }

    render() {
        const { screenings, loading } = this.props.data;
        let screeningsMarup = ! loading ? (
        screenings.map(screening => <Screening key={screening.screening_id} screening={screening}/>)
        ) : (<p>Loading ...</p>);
        return (
            <Grid container spacing={16}>
                <Grid item sm/>
                <Grid item sm/>
                <Grid item sm/>
                <Grid item sm={8} xs={12}>
                    {screeningsMarup}
                </Grid>
                {/* <Grid item sm/> */}
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
            </Grid>
        );
    }
}


home.propTypes = {
    getScreenings: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    data: state.data
})


export default connect(mapStateToProps, { getScreenings })(home);