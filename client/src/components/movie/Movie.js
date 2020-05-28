import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomButton from '../../util/CustomButton';
import DeleteMovie from './DeleteMovie';
import UpdateMovie from './UpdateMovie';
import MovieDialog from './MovieDialog';


// MUI
import Card from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress'

// Icons
import ChatIcon from '@material-ui/icons/Chat';
import GradeIcon from '@material-ui/icons/Grade';
import CloseIcon from '@material-ui/icons/Close';


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
    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        const {
            classes,
            movie: {
                description,
                duration,
                genre: {
                    genre_id,
                    name
                },
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

        const screeningsMarkup = Object.keys(screenings).map(screening_date => (
            <Fragment>
                <Typography variant="body2" color="textPrimary">{screening_date}</Typography>
                {screenings[screening_date].map(screening => (
                    <Fragment>
                        <Button
                            color="primary"
                            variant="contained"
                            className={classes.screeningButton}
                            onClick={this.handleOpen}
                        >
                            {screening.start_time}
                        </Button>
                        <Dialog
                            open={this.state.open}
                            onClose={this.handleClose}
                            fullWidth
                            maxWidth="sm"
                        >
                            <CustomButton
                                tip="Close"
                                onClick={this.handleClose}
                                tipClassName={classes.closeButton}
                            >
                                <CloseIcon />
                            </CustomButton>
                            <DialogTitle>Screening details</DialogTitle>
                            <DialogContent>
                                <Typography variant="h5" color="primary">{title}</Typography>
                                <Typography variant="body2" color="textSecondary">Date: {screening.screening_date}</Typography>
                                <Typography variant="body2" color="textSecondary">Time: {screening.start_time}</Typography>
                                <Typography variant="body2" color="textSecondary">Duration: {screening.duration} min</Typography>
                                <Typography variant="body2" color="textSecondary">Genre: {name}</Typography>
                                <Typography variant="body1">Price: {screening.price} UAH</Typography>
                                {!is_admin ? (
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        className={classes.bookButton}
                                        component={Link}
                                        to={`/booking/${screening.screening_id}/${screening.auditorium}`}
                                    >
                                        Book
                                    </Button>
                                ): ( <hr className={classes.invisibleSeparator} />)}
                            </DialogContent>
                        </Dialog>
                    </Fragment>
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


const mapActionsToProps = {

}


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Movie));