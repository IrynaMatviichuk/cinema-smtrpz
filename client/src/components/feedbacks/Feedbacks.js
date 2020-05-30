import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import DeleteFeedback from './DeleteFeedback';

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
    }
})


class Feedbacks extends Component {
    render() {
        const { classes, feedbacks, movieId, user: { authenticated, cinema_user_id, is_admin } } = this.props;
        let currentDate = new Date().toISOString().split('T')[0];

        return (
            <Grid container >
                {feedbacks.map((feedback, index) => {
                    const {
                        cinema_user,
                        feedback_date,
                        feedback_id,
                        feedback_time,
                        movie,
                        review,
                        score
                    } = feedback;

                    const deleteButton = authenticated && (cinema_user_id === cinema_user.cinema_user_id || is_admin) ? (
                        <DeleteFeedback feedbackId={feedback_id} movieId={movieId} style={{justifyContent: 'right'}}/>
                    ) : null;

                    return (
                        <Fragment key={feedback_id}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={11}>
                                        <div className={classes.commentData}>
                                            <Grid container justify="space-between">
                                                <Typography
                                                    variant="h5"
                                                    color="primary"
                                                    inline
                                                    align="left"
                                                >
                                                    @{cinema_user.username}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    align="right"
                                                    color="textSecondary"
                                                    inline
                                                >
                                                    {feedback_date === currentDate ? feedback_time : feedback_date}
                                                </Typography>
                                            </Grid>
                                            <hr className={classes.invisibleSeparator} />
                                            <Typography variant="body2">
                                                score: {score}
                                            </Typography>
                                            <Typography variant="body1">
                                                {review}
                                            </Typography>
                                        </div>
                                    </Grid>
                                    <Grid item sm={1}>
                                        {deleteButton}
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
    user: PropTypes.object.isRequired,
    feedbacks: PropTypes.array.isRequired
}


const mapStateToProps = state => ({
    user: state.user
})


export default connect(mapStateToProps)(withStyles(styles)(Feedbacks));