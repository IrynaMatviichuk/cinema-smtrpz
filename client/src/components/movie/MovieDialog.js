import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Feedbacks from '../feedbacks/Feedbacks';
import FeedbackForm from '../screening/FeedbackForm';
import CustomButton from '../../util/CustomButton';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { getMovie, clearErrors } from '../../redux/actions/dataActions';

// MUI
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';


const styles = theme => ({
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    dialogContent: {
        paddingTop: 20,
        paddingBottom: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '1%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    },
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 10
    }
})


class MovieDialog extends Component {
    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({ open: true });
        this.props.getMovie(this.props.movieId);
    }

    handleClose = () => {
        this.setState({ open: false });
        this.props.clearErrors();
    }

    render() {
        const {
            classes,
            movie: {
                movie_id,
                title,
                duration,
                genre,
                description,
                feedbacks
            },
            UI: {
                loading
            }
        } = this.props;

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2} />
            </div>
        ) : (
                <Grid container spacing={16}>
                    {movie_id && (
                        <Fragment>
                            <Grid item sm={7}>
                                <Typography variant="h5" color="primary">{title}</Typography>
                                <Typography variant="body1" color="textSecondary">Duration: {duration} min</Typography>
                                <Typography variant="body1" color="textSecondary">Genre: {genre.name}</Typography>
                                <Typography variant="body2" color="textSecondary">Description: {description}</Typography>
                            </Grid>
                            <hr className={classes.visibleSeparator}/>
                            <FeedbackForm movieId={movie_id}/>
                            <Feedbacks feedbacks={feedbacks} movieId={movie_id}/>
                        </Fragment>
                    )}
                </Grid>
            );

        return (
            <Fragment>
                <CustomButton onClick={this.handleOpen} tip="Expand screening" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary" />
                </CustomButton>
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
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}


MovieDialog.propTypes = {
    getMovie: PropTypes.func.isRequired,
    movieId: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    movie: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
    movie: state.data.movie,
    UI: state.UI
})


const mapActionsToProps = {
    getMovie,
    clearErrors
}


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(MovieDialog));