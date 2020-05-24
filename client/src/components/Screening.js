import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomButton from '../util/CustomButton';
import DeleteScreening from './DeleteScreening';
import PostScreening from './PostScreening';

// MUI
import Card from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

// Icons
import ChatIcon from '@material-ui/icons/Chat';


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


class Screening extends Component {
    render() {
        const {
            classes,
            screening: {
                auditorium,
                end_time,
                movie: {
                    description,
                    duration,
                    genre: {
                        genre_id,
                        name
                    },
                    movie_id,
                    title
                },
                price,
                screening_date,
                screening_id,
                start_time
            },
            user: {
                authenticated,
                is_admin
            }
        } = this.props;

        const deleteButton = authenticated && is_admin ? (
            <DeleteScreening screeningId={screening_id} />
        ) : null;

        return (
            <Card className={classes.card}>
                <Paper className={classes.card}>
                    <CardContent className={classes.content}>
                        <Typography variant="h5" component={Link} to={`/movie/${movie_id}`} color="primary">{title}</Typography>
                        <Typography variant="body2" color="textSecondary">Date: {screening_date}</Typography>
                        <Typography variant="body2" color="textSecondary">Time: {start_time}</Typography>
                        <Typography variant="body2" color="textSecondary">Duration: {duration} min</Typography>
                        <Typography variant="body2" color="textSecondary">Genre: {name}</Typography>
                        <Typography variant="body1">Price: {price} UAH</Typography>
                        <CustomButton tip="Feedbacks">
                            <ChatIcon color="primary" />
                        </CustomButton>
                        {/* <span>{feedbackCount} feedback</span> */}
                        {deleteButton}
                    </CardContent>
                </Paper>
            </Card>
        );
    }
}


Screening.propTypes = {
    user: PropTypes.object.isRequired,
    screening: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    user: state.user
})


const mapActionsToProps = {

}


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Screening));