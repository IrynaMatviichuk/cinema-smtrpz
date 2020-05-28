import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomButton from '../../util/CustomButton';
import DeleteScreening from './DeleteScreening';
import UpdateScreening from './UpdateScreening';
import ScreeningDialog from './ScreeningDialog';


// MUI
import Button from '@material-ui/core/Button';
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
        marginBottom: 10,
        marginRight: 20

    },
    content: {
        padding: 25
    },
}


class Screening extends Component {
    render() {
        const {
            classes,
            screening: {
                auditorium: {
                    auditorium_id,
                    name
                },
                end_time,
                movie: {
                    description,
                    duration,
                    genre,
                    // {
                    //     genre_id,
                    //     name
                    // },
                    movie_id,
                    title,
                    feedbacks
                },
                price,
                screening_date,
                screening_id,
                start_time
            },
            user: {
                authenticated,
                is_admin,
                cinema_user_id
            }
        } = this.props;

        const deleteButton = authenticated && is_admin ? (
            <DeleteScreening screeningId={screening_id} />
        ) : null;

        const updateButton = authenticated && is_admin ? (
            <UpdateScreening screeningId={screening_id} userId={cinema_user_id}/>
        ) : null;

        const bookButton = authenticated && !is_admin ? (
            <Button color="inherit" component={Link} to={`/booking/${screening_id}/${auditorium_id}`}>
                Book
            </Button>
        ) : null;

        const averageScore = feedbacks?(
            Math.round(feedbacks.reduce((accum, iter) => accum + iter.score, 0) / feedbacks.length * 100) / 100
        ) : null;
        const feedbacksCount = feedbacks ? feedbacks.length : "no";

        return (
            <Card className={classes.card}>
                <Paper className={classes.card}>
                    <CardContent className={classes.content}>
                        <Typography variant="h5" color="primary">{title}</Typography>
                        <Typography variant="body2" color="textSecondary">Date: {screening_date}</Typography>
                        <Typography variant="body2" color="textSecondary">Time: {start_time}</Typography>
                        <Typography variant="body2" color="textSecondary">Duration: {duration} min</Typography>
                        <Typography variant="body2" color="textSecondary">Genre: {genre.name}</Typography>
                        <Typography variant="body2" color="textSecondary">Auditorium: {name}</Typography>
                        <Typography variant="body1">Price: {price} UAH</Typography>
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
                        {bookButton}
                        <ScreeningDialog screeningId={screening_id} userId={cinema_user_id}/>
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