import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomButton from '../../util/CustomButton';

// MUI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

// Redux
import { deleteFeedback } from '../../redux/actions/dataActions';


const styles = {
    // deleteButton: {
    //     position: 'absolute',
    //     left: '90%',
    //     top: '5%'
    // }
}


class DeleteFeedback extends Component {
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    deleteScreening = () => {
        this.props.deleteFeedback(this.props.feedbackId, this.props.screeningId);
        this.setState({ open: false });
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <CustomButton
                    tip="Delete feedback"
                    onClick={this.handleOpen}
                    btnClassName={classes.deleteButton}
                >
                    <DeleteOutline color="secondary" />
                </CustomButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>
                        Are you sure you want to delete this feedback?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.deleteScreening} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}


DeleteFeedback.propTypes = {
    deleteFeedback: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screeningId: PropTypes.number.isRequired
}

export default connect(null, { deleteFeedback })(withStyles(styles)(DeleteFeedback));