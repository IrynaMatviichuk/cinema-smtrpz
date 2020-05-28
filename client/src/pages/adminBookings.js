import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Booking from '../components/booking/Booking';
import Profile from '../components/Profile';

// Redux
import { connect } from 'react-redux';
import { getBookings } from '../redux/actions/dataActions';

// MUI
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = {}


class adminBookings extends Component {
    componentDidMount() {
        this.props.getBookings();
    }

    render() {
        const {
            classes,
            data: {
                bookings,
                loading
            },
            authenticated
        } = this.props;

        let bookingMarkup = !loading ? (
            bookings.map(booking => <Booking key={booking.booking_id} booking={booking}/>)
        ) : (<p>Loading ...</p>);

        return (
            <Grid container spacing={16}>
                <Grid item sm={8} xs={12}>
                    {bookingMarkup}
                </Grid>
                {authenticated && (
                    <Grid item sm={4} xs={12}>
                        <Profile />
                    </Grid>
                )}
            </Grid>
        )
    }
}

adminBookings.propTypes = {
    getBookings: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired
}


const mapStateToProps = state => ({
    data: state.data,
    authenticated: state.user.authenticated
})


export default connect(mapStateToProps, { getBookings })(adminBookings);