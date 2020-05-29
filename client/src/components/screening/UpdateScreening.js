import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomButton from '../../util/CustomButton';

// Redux
import { connect } from 'react-redux';
import { getScreening, getMovies, getAuditoriums, updateScreening, clearErrors } from '../../redux/actions/dataActions';

// MUI
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

// Icons
import CloseIcon from '@material-ui/icons/Close';
import UpdateIcon from '@material-ui/icons/Update';


const styles = theme => ({
    submitButton: {
        position: 'relative',
        margin: '10px auto 10px auto',
        float: 'right'
    },
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    // dialogContent: {
    //     paddingTop: 20,
    //     paddingBottom: 20
    // },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '1%'
    },
    updateButton: {
        position: 'absolute',
        left: '90%',
        top: '38%'
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


const numberFieldProps = {
    step: "1"
}


class UpdateScreening extends Component {
    state = {
        open: false,
        movie_id_fk: '',
        auditorium_id_fk: '',
        price: '',
        screening_date: '',
        start_time: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }

        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({
                movie_id_fk: undefined,
                auditorium_id_fk: undefined,
                price: undefined,
                screening_date: undefined,
                start_time: undefined,
                open: false,
                errors: {}
            });
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
        const screening = this.props.screenings.find(screening => screening.screening_id === this.props.screeningId);
        this.setState({
            movie_id_fk: screening.movie.movie_id,
            auditorium_id_fk: screening.auditorium.auditorium_id,
            price: String(screening.price),
            screening_date: screening.screening_date,
            start_time: screening.start_time
        });
    }

    handleClose = () => {
        this.setState({ open: false });
        this.props.clearErrors();
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        const updatedScreening = {
            movie_id_fk: this.state.movie_id_fk,
            auditorium_id_fk: this.state.auditorium_id_fk,
            price: Number(this.state.price),
            screening_date: this.state.screening_date,
            start_time: this.state.start_time
        };

        this.props.updateScreening(updatedScreening, this.props.screeningId);
    }

    render() {
        const {
            classes,
            movies,
            auditoriums,
            UI: {
                loading
            }
        } = this.props;
        const { errors } = this.state;

        return (
            <Fragment>
                <CustomButton onClick={this.handleOpen} tip="Update screening" tipClassName={classes.updateButton}>
                    <UpdateIcon color="primary" />
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
                    <DialogTitle>Update a screening</DialogTitle>
                    <DialogContent className={this.dialogContent}>
                        <form onSubmit={this.handleSubmit}>
                            <InputLabel shrink className={classes.label}>Movie</InputLabel>
                            <Select
                                name="movie_id_fk"
                                label="Movie"
                                value={this.state.movie_id_fk}
                                error={errors.movie_id_fk ? true : false}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            >
                                {!loading && (
                                    movies.map(movie => <MenuItem value={movie.movie_id}>{movie.title}</MenuItem>)
                                )}
                            </Select>
                            <FormHelperText error={errors.movie_id_fk ? true : false}>{errors.movie_id_fk}</FormHelperText>
                            <InputLabel shrink className={classes.label}>Auditorium</InputLabel>
                            <Select
                                name="auditorium_id_fk"
                                label="Auditorium"
                                value={this.state.auditorium_id_fk}
                                error={errors.auditorium_id_fk ? true : false}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                                disabled
                            >
                                {!loading && (
                                    auditoriums.map(auditorium => <MenuItem value={auditorium.auditorium_id}>{auditorium.name}</MenuItem>)
                                )}
                            </Select>
                            <FormHelperText error={errors.auditorium_id_fk ? true : false}>{errors.auditorium_id_fk}</FormHelperText>
                            <TextField
                                name="price"
                                type="number"
                                inputProps={numberFieldProps}
                                label="Price"
                                placeholder="price"
                                value={this.state.price}
                                helperText={errors.price}
                                error={errors.price ? true : false}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                name="screening_date"
                                type="date"
                                label="Screening date"
                                value={this.state.screening_date}
                                helperText={errors.screening_date}
                                error={errors.screening_date ? true : false}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                name="start_time"
                                type="time"
                                label="Start time"
                                value={this.state.start_time}
                                helperText={errors.start_time}
                                error={errors.start_time ? true : false}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submitButton}
                                disabled={loading}
                            >
                                Submit
                                {loading && (
                                    <CircularProgress size={30} className={classes.progressSpinner} />
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}


UpdateScreening.propTypes = {
    updateScreening: PropTypes.func.isRequired,
    screeningId: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    screenings: PropTypes.object.isRequired,
    movies: PropTypes.object.isRequired,
    auditoriums: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
    screenings: state.data.screenings,
    movies: state.data.movies,
    auditoriums: state.data.auditoriums,
    UI: state.UI
})


const mapActionsToProps = {
    updateScreening,
    clearErrors
}


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(UpdateScreening));