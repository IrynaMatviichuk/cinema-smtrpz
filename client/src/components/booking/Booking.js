import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomButton from '../../util/CustomButton';


// MUI
import Card from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';


const styles = {
    card: {
        position: 'relative',
        marginBottom: 10,
        marginRight: 20

    },
    content: {
        padding: 25
    },
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
}


class Booking extends Component {
    render() {
        const {
            classes,
            booking: {
                booking_id,
                booking_date,
                booking_time,
                cinema_user_id_fk: {
                    firstname,
                    lastname,
                    username
                },
                screening_id_fk:
                {
                    auditorium: {
                        name
                    },
                    start_time,
                    end_time,
                    price,
                    screening_date,
                    movie: {
                        title
                    },
                },
                seat_id_fk: {
                    number,
                    row
                }
            },
            user: {
                authenticated,
                is_admin,
                cinema_user_id
            }
        } = this.props;

        return (
            <Card className={classes.card}>
                <Paper className={classes.card}>
                    <CardContent className={classes.content}>
                        <Grid container justify="space-between">
                            <Typography
                                variant="h5"
                                align="left"
                                color="primary"
                                inline
                            >
                                {title}
                            </Typography>
                            <Typography
                                variant="body2"
                                align="right"
                                color="textSecondary"
                                inline
                            >
                                {booking_date} {booking_time}
                            </Typography>
                        </Grid>
                        <hr className={classes.invisibleSeparator} />
                        <Typography
                            variant="body2"
                            color="textPrimary"
                        >
                            customer: {firstname} {lastname} (@{username})
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textPrimary"
                        >
                            date: {screening_date}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textPrimary"
                        >
                            time: from {start_time} to {end_time}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textPrimary"
                        >
                            price: {price}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textPrimary"
                        >
                            auditorium: {name}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textPrimary"
                        >
                            seat: row - {row} number - {number}
                        </Typography>
                    </CardContent>
                </Paper>
            </Card>
        )
    }
}


Booking.propTypes = {
    user: PropTypes.object.isRequired,
    booking: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    user: state.user
})


const mapActionsToProps = {

}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Booking));