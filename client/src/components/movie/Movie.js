import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomButton from '../../util/CustomButton';
import DeleteMovie from './DeleteMovie';
import UpdateMovie from './UpdateMovie';
import MovieDialog from './MovieDialog';
import BookingDialog from '../booking/BookingDialog';


// MUI
import Card from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

// Icons
import ChatIcon from '@material-ui/icons/Chat';
import GradeIcon from '@material-ui/icons/Grade';


const styles = {
    card: {
        position: 'relative',
        marginBottom: 10,
        marginRight: 20

    },
    content: {
        padding: 25
    },
    screeningButton: {
        marginRight: '10px'
    },
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    bookButton: {
        position: 'relative',
        margin: '10px auto 10px auto',
        float: 'right'
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '2%'
    },
}


class Movie extends Component {
    render() {
        const {
            classes,
            movie: {
                duration,
                genre: { name },
                movie_id,
                title,
                feedbacks,
                screenings
            },
            user: {
                authenticated,
                is_admin,
                cinema_user_id
            }
        } = this.props;

        const screeningsMarkup = screenings && Object.keys(screenings).map(screening_date => (
            <Fragment>
                <Typography variant="body2" color="textPrimary">{screening_date}</Typography>
                {screenings[screening_date].map(screening => (
                    <BookingDialog screening={screening} title={title} is_admin={is_admin} genre={name} />
                ))
                }
            </Fragment>
        ));

        const deleteButton = authenticated && is_admin ? (
            <DeleteMovie movieId={movie_id} />
        ) : null;

        const updateButton = authenticated && is_admin ? (
            <UpdateMovie movieId={movie_id} userId={cinema_user_id} />
        ) : null;

        const averageScore = feedbacks ? (
            Math.round(feedbacks.reduce((accum, iter) => accum + iter.score, 0) / feedbacks.length * 100) / 100
        ) : undefined;
        const feedbacksCount = feedbacks ? feedbacks.length : "no";

        return (
            <Card className={classes.card}>
                <Paper className={classes.card}>
                    <CardContent className={classes.content}>
                        <Typography variant="h5" color="primary">{title}</Typography>
                        <hr className={classes.invisibleSeparator} />
                        <Typography variant="body1" color="textSecondary">Duration: {duration} min</Typography>
                        <Typography variant="body1" color="textSecondary">Genre: {name}</Typography>
                        <hr className={classes.invisibleSeparator} />
                        {screeningsMarkup}
                        <hr className={classes.invisibleSeparator} />
                        <CustomButton tip="Feedbacks">
                            <GradeIcon color="primary" />
                        </CustomButton>
                        <span> {averageScore ? averageScore : "no"} average score</span>
                        <CustomButton tip="Feedbacks">
                            <ChatIcon color="primary" />
                        </CustomButton>
                        <span> {feedbacksCount} feedbacks</span>
                        {deleteButton}
                        {updateButton}
                        <MovieDialog movieId={movie_id} userId={cinema_user_id} />
                    </CardContent>
                </Paper>
            </Card>
        );
    }
}


Movie.propTypes = {
    user: PropTypes.object.isRequired,
    movie: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    user: state.user
})


export default connect(mapStateToProps)(withStyles(styles)(Movie));