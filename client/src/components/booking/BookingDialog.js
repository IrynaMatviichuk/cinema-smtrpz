import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomButton from '../../util/CustomButton';


// MUI
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress'

// Icons
import CloseIcon from '@material-ui/icons/Close';


const styles = {
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


class BookingDialog extends Component {
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
        const { classes, screening, title, is_admin, genre } = this.props;

        return (
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
                        <Typography variant="body2" color="textSecondary">Genre: {genre}</Typography>
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
                        ) : (<hr className={classes.invisibleSeparator} />)}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}


export default withStyles(styles)(BookingDialog);