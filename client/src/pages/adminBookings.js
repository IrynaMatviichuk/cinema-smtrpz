import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Booking from '../components/booking/Booking';
import Profile from '../components/Profile';

// Redux
import { connect } from 'react-redux';
import { getBookings, getUsers } from '../redux/actions/dataActions';

// MUI
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';


const styles = {
    searchField: {
        margin: '10px auto 10px auto'
    },
    card: {
        position: 'relative',
        marginBottom: 10,
        marginRight: 20

    },
    content: {
        padding: 25
    },
}


class adminBookings extends Component {
    state = {
        user: ''
    }

    componentDidMount() {
        this.props.getBookings();
        this.props.getUsers();
    }

    render() {
        const {
            classes,
            data: {
                bookings,
                users,
                loading
            },
            authenticated
        } = this.props;

        let filterPanel = (
            <Card className={classes.card}>
                <Paper className={classes.card}>
                    <CardContent className={classes.content}>
                        <Select
                            name="user"
                            label="User"
                            value={this.state.user}
                            className={classes.searchField}
                            onChange={this.handleChange}
                            fullWidth
                        >
                            {!loading && (
                                users.map(user => <MenuItem value={user.cinema_user_id}>@{user.username}</MenuItem>)
                            )}
                        </Select>
                    </CardContent>
                </Paper>
            </Card>
        );

        let bookingMarkup = !loading ? (
            bookings.map(booking => <Booking key={booking.booking_id} booking={booking} />)
        ) : (<p>Loading ...</p>);

        return (
            <Grid container spacing={16}>
                <Grid item sm={8} xs={12}>
                    {filterPanel}
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
    getUsers: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired
}


const mapStateToProps = state => ({
    data: state.data,
    authenticated: state.user.authenticated
})


export default connect(mapStateToProps, { getBookings, getUsers })(withStyles(styles)(adminBookings));