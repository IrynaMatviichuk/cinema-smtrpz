import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Booking from '../components/booking/Booking';
import Profile from '../components/Profile';

// Redux
import { connect } from 'react-redux';
import { getAuditorium, getBookedSeats, postBooking } from '../redux/actions/dataActions';

// MUI
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = {
    submitButton: {
        position: 'relative',
        margin: '10px auto 10px auto',
        // float: 'right'
    },
    seatButton: {
        margin: '7px',
        maxWidth: '30px',
        maxHeight: '30px',
        minWidth: '30px',
        minHeight: '30px'
    },
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 10
    },
    invisibleSeparator: {
        border: 'none',
        margin: 10
    },
}


class booking extends Component {
    state = {
        chosenSeats: []
    }

    componentDidMount() {
        this.props.getAuditorium(this.props.match.params.auditoriumId);
        this.props.getBookedSeats(this.props.match.params.screeningId);
    }

    handleSeatCLick = event => {
        const targetId = Number(event.target.id);
        const { chosenSeats } = this.state;
        if (this.state.chosenSeats.includes(targetId)) {
            const index = chosenSeats.indexOf(targetId);
            chosenSeats.splice(index, 1);
            this.setState({ chosenSeats: chosenSeats });
        } else {
            chosenSeats.push(targetId);
            this.setState({ chosenSeats: chosenSeats });
        }
        console.log(this.state.chosenSeats);
    }

    handleSubmit = event => {
        event.preventDefault();
        const { chosenSeats } = this.state;
        let newBooking = [];
        for (let seat of chosenSeats) {
            newBooking.push({
                screening_id_fk: this.props.match.params.screeningId,
                cinema_user_id_fk: this.props.user.cinema_user_id,
                seat_id_fk: seat
            })
        }

        console.log(newBooking);
        this.props.postBooking(newBooking);
    }

    render() {
        const {
            classes,
            data: {
                loading,
                auditorium: {
                    name,
                    seats
                },
                bookedSeats
            },
            user: {
                authenticated,
                cinema_user_id
            }
        } = this.props;
        const { chosenSeats } = this.state;

        let bookingMarkup = !loading ? (
            <div>
            </div>
        ) : (<p>Loading ...</p>);

        let auditoriumMarkup = !loading && seats ? (
            <Fragment>
                <Grid container spacing={16}>
                    <Grid item sm={8} xs={30}></Grid>
                    {Object.entries(seats).map(row => (
                        <Grid item sm={10} xs={50}>
                            <span>{row[0]} row</span>
                            {row[1].map(seat => (
                                // <Button
                                // variant="contained"
                                //     className={classes.seatButton}
                                //     >
                                //         {seat.number}
                                // </Button>
                                <button
                                    id={seat.seat_id}
                                    onClick={this.handleSeatCLick}
                                    disabled={bookedSeats.includes(seat.seat_id)}
                                    className={`MuiButtonBase-root MuiButton-root MuiButton-contained booking-seatButton-284 MuiButton-contained${chosenSeats.includes(seat.seat_id) ? "Secondary" : "Primary"} MuiButton-containedSizeSmall MuiButton-sizeSmall ${bookedSeats.includes(seat.seat_id) ? "Mui-disabled Mui-disabled" : ""} booking-seatButton`}
                                    styles={{
                                        margin: '7px',
                                        maxWidth: '30px',
                                        maxHeight: '30px',
                                        minWidth: '30px',
                                        minHeight: '30px'
                                    }}
                                >
                                    {bookedSeats.includes(seat.seat_id) ? "x" : seat.number}
                                </button>
                            ))}
                            <hr className={classes.invisibleSeparator} />
                        </Grid>
                    ))}
                    <Grid item sm={8} xs={30}></Grid>
                </Grid>
            </Fragment>
        ) : null;

        return (
            <Fragment>
                <Grid container spacing={16}>
                    <Grid item sm={8} xs={12}>
                        <Typography variant="h5" color="primary" align="center">Choose seats to book</Typography>
                        {bookingMarkup}
                        {auditoriumMarkup}
                        <form onSubmit={this.handleSubmit}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submitButton}
                                disabled={loading}
                            >
                                Submit
                                {loading && (
                                    <CircularProgress size={30} className={classes.progressSpinner} />
                                )}
                            </Button>
                        </form>
                    </Grid>
                    {authenticated && (
                        <Grid item sm={4} xs={12}>
                            <Profile />
                        </Grid>
                    )}
                </Grid>
            </Fragment>
        )
    }
}


booking.propTypes = {
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getAuditorium: PropTypes.func.isRequired,
    getBookedSeats: PropTypes.func.isRequired,
    postBooking: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
    data: state.data,
    user: state.user
})


const mapActionsToProps = {
    getAuditorium,
    getBookedSeats,
    postBooking
}


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(booking));
