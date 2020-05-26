import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';

// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 10
    },
    dateTime: {
        textAlign: 'right'
    }
})


class Feedbacks extends Component {
    render() {
        const { classes, feedbacks } = this.props;
        let currentDate = new Date().toISOString().split('T')[0];
        console.log("feedbacks", feedbacks);
        return (
            <Grid container >
                {feedbacks.map((feedback, index) => {
                    const {
                        cinema_user: {
                            username
                        },
                        feedback_date,
                        feedback_id,
                        feedback_time,
                        movie,
                        review,
                        score
                    } = feedback;
                    return (
                        <Fragment key={feedback_id}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={10}>
                                        <div className={classes.commentData}>
                                            <Typography
                                                variant="h5"
                                                color="primary"
                                            >
                                                @{username}
                                            </Typography>
                                            <hr className={classes.invisibleSeparator} />
                                            <Typography variant="body2">
                                                score: {score}
                                            </Typography>
                                            <Typography variant="body1">
                                                {review}
                                            </Typography>
                                        </div>
                                    </Grid>
                                    <Grid item sm={2} className={classes.dateTime}>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {feedback_date === currentDate ? feedback_time : feedback_date}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {index !== feedbacks.length - 1 && (
                                <hr className={classes.visibleSeparator} />
                            )}
                        </Fragment>
                    )
                })}
            </Grid>
        )
    }
}


Feedbacks.propTypes = {
    feedbacks: PropTypes.array.isRequired
}


export default withStyles(styles)(Feedbacks);