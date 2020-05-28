import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomButton from '../../util/CustomButton';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { getScreening, clearErrors } from '../../redux/actions/dataActions';

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


class ScreeningDialog extends Component {
    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({ open: true });
        this.props.getScreening(this.props.screeningId);
    }

    handleClose = () => {
        this.setState({ open: false });
        this.props.clearErrors();
    }

    render() {
        const {
            classes,
            screening: {
                auditorium,
                end_time,
                movie,
                price,
                screening_date,
                screening_id,
                start_time
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
                    {screening_id && (
                        <Fragment>
                            <Grid item sm={7}>
                                <Typography variant="h5" component={Link} to={`/movie/${movie.movie_id}`} color="primary">{movie.title}</Typography>
                                <hr className={classes.invisibleSeparator} />
                                <Typography variant="body2" color="textSecondary">Date: {screening_date}</Typography>
                                <Typography variant="body2" color="textSecondary">Time: {start_time}</Typography>
                                <Typography variant="body2" color="textSecondary">Duration: {movie.duration} min</Typography>
                                <Typography variant="body2" color="textSecondary">Genre: {movie.genre.name}</Typography>
                                <Typography variant="body1">Price: {price} UAH</Typography>
                            </Grid>
                            <hr className={classes.visibleSeparator}/>
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


ScreeningDialog.propTypes = {
    getScreening: PropTypes.func.isRequired,
    screeningId: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    screening: PropTypes.object.isRequired,
    // data: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
}


const mapStateToProps = (state) => ({
    screening: state.data.screening,
    // data: state.data,
    UI: state.UI
})


const mapActionsToProps = {
    getScreening,
    clearErrors
}


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreeningDialog));