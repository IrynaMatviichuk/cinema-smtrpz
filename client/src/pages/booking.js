import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// import io from 'socket.io-client';
import socketIOClient from 'socket.io-client';
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


// let socket = io.connect();
let socket = socketIOClient("http://localhost:8082");


const styles = {
    submitButton: {
        // position: 'relative',
        margin: '10px auto 10px auto',
        // position: 'absolute',
        float: 'right',
        marginRight: '160px'
        // left: '90%',
        // top: '2%'
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
    constructor() {
        super();
        this.state = {
            chosenSeats: [],
            reservedSeats: false
        }
    }

    componentDidMount() {
        this.props.getAuditorium(this.props.match.params.auditoriumId);
        this.props.getBookedSeats(this.props.match.params.screeningId);

        socket.emit('get seats', { screeningId: this.props.match.params.screeningId });

        socket.on('accept seats', data => {
            this.setState({
                reservedSeats: JSON.parse(data)
            });
        })

        socket.on('updated seats', data => {
            this.setState({
                chosenSeats: [],
                reservedSeats: JSON.parse(data)
            });
        })
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

        socket.emit('book seat', newBooking);
    }

    render() {
        const {
            classes,
            data: {
                loading,
                auditorium: { seats },
                bookedSeats
            },
            user: { authenticated }
        } = this.props;
        const { chosenSeats, reservedSeats } = this.state;

        let bookingMarkup = !loading ? (
            <div>
            </div>
        ) : (<p>Loading ...</p>);

        let auditoriumMarkup = !loading && seats && reservedSeats ? (
            <Fragment>
                <Grid container spacing={16} alignContent="center" justify="center">
                    {Object.entries(seats).map(row => (
                        <Grid item sm={10} xs={10}>
                            {row[1].map(seat => (
                                <button
                                    id={seat.seat_id}
                                    onClick={this.handleSeatCLick}
                                    disabled={reservedSeats.includes(seat.seat_id)}
                                    className={`MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-contained${chosenSeats.includes(seat.seat_id) ? "Secondary" : "Primary"} MuiButton-containedSizeSmall MuiButton-sizeSmall ${reservedSeats.includes(seat.seat_id) ? "Mui-disabled Mui-disabled" : ""} booking-seatButton`}
                                    style={{
                                        marginRight: '10px',
                                        maxWidth: '30px',
                                        maxHeight: '30px',
                                        minWidth: '30px',
                                        minHeight: '30px'
                                    }}
                                >
                                    {reservedSeats.includes(seat.seat_id) ? "x" : seat.number}
                                </button>
                            ))}
                            <Typography variant="overline" color="textPrimary" align="right" inline-block>{row[0] + " row" + (row[0] > 9 ? "" : " ")}</Typography>
                            <hr className={classes.invisibleSeparator} />
                        </Grid>
                    ))}
                </Grid>
            </Fragment>
        ) : null;

        return (
            <Fragment>
                <Grid container spacing={16} alignContent="center" justify="center">
                    <Grid item sm/>
                    <Grid item sm/>
                    <Grid item sm/>
                    <Grid item sm/>
                    <Grid item sm={6} xs={12} alignContent="center">
                        <Typography variant="h5" color="primary" align="center">Choose seats to book</Typography>
                        <hr className={classes.invisibleSeparator} />
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
