import React, { Component } from 'react';
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

// Icons
import ChatIcon from '@material-ui/icons/Chat';
import GradeIcon from '@material-ui/icons/Grade';


const styles = {
    card: {
        position: 'relative',
        // display: 'flex',
        marginBottom: 10,
        marginRight: 20

    },
    content: {
        padding: 25
    }
}


class Movie extends Component {
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
                feedbacks
            },
            user: {
                authenticated,
                is_admin,
                cinema_user_id
            }
        } = this.props;

        const deleteButton = authenticated && is_admin ? (
            <DeleteMovie movieId={movie_id} />
        ) : null;

        const updateButton = authenticated && is_admin ? (
            <UpdateMovie movieId={movie_id} userId={cinema_user_id}/>
        ) : null;

        const averageScore = feedbacks ? (
            Math.round(feedbacks.reduce((accum, iter) => accum + iter.score, 0) / feedbacks.length * 100) / 100
        ) : undefined;
        const feedbacksCount = feedbacks ? feedbacks.length : "no";

        return (
            <Card className={classes.card}>
                <Paper className={classes.card}>
                    <CardContent className={classes.content}>
                        <Typography variant="h5" component={Link} to={`/movie/${movie_id}`} color="primary">{title}</Typography>
                        <Typography variant="body1" color="textSecondary">Duration: {duration} min</Typography>
                        <Typography variant="body1" color="textSecondary">Genre: {name}</Typography>
                        <Typography variant="body2" color="textSecondary">Description: {description}</Typography>
                        <CustomButton tip="Feedbacks">
                            <GradeIcon color="primary"/>
                        </CustomButton>
                        <span> {averageScore ? averageScore : "no"} average score</span>
                        <CustomButton tip="Feedbacks">
                            <ChatIcon color="primary" />
                        </CustomButton>
                        <span> {feedbacksCount} feedbacks</span>
                        {deleteButton}
                        {updateButton}
                        <MovieDialog movieId={movie_id} userId={cinema_user_id}/>
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