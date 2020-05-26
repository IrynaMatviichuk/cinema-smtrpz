import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomButton from '../../util/CustomButton';

// Redux
import { connect } from 'react-redux';
import {
    postScreening,
    getMovies,
    getAuditoriums,
    clearErrors
} from '../../redux/actions/dataActions';

// MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

// Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';


const styles = {
    submitButton: {
        position: 'relative',
        margin: '10px auto 10px auto',
        float: 'right'
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '2%'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    label: {
        marginTop: '15px'
    }
}

const numberFieldProps = {
    step: "1"
}


class PostScreening extends Component {
        state = {
            open: false,
            movie_id_fk: undefined,
            auditorium_id_fk: undefined,
            price: undefined,
            screening_date: undefined,
            start_time: undefined,
            errors: {}
        };

    componentDidMount() {
        this.props.getMovies();
        this.props.getAuditoriums();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }

        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({
                movie_id_fk: undefined,
                auditorium_id_fk: undefined,
                price: '',
                screening_date: undefined,
                start_time: undefined,
                open: false,
                errors: {}
            });
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {} });
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const newScreening = {
            movie_id_fk: this.state.movie_id_fk,
            auditorium_id_fk: this.state.auditorium_id_fk,
            price: Number(this.state.price),
            screening_date: this.state.screening_date,
            start_time: `${this.state.start_time}:00`
        };

        this.props.postScreening(newScreening);
    }

    render() {
        const { classes, data: { movies, auditoriums }, UI: { loading }} = this.props;
        const { errors } = this.state;

        return (
            <Fragment>
                <CustomButton onClick={this.handleOpen} tip="Post a screening">
                    <AddIcon/>
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
                        <CloseIcon/>
                    </CustomButton>
                    <DialogTitle>Post a new screening</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <InputLabel shrink className={classes.label}>Movie</InputLabel>
                            <Select
                                name="movie_id_fk"
                                label="Movie"
                                // helperText={errors.movie_id_fk}
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
                                helperText={errors.auditorium_id_fk}
                                error={errors.auditorium_id_fk ? true : false}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
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
                                helperText={errors.price}
                                error={errors.price ? true : false}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                                InputLabelProps={{shrink: true}}
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
                                InputLabelProps={{shrink: true}}
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
                                InputLabelProps={{shrink: true}}
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
                                    <CircularProgress size={30} className={classes.progressSpinner}/>
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}


PostScreening.propTypes = {
    postScreening: PropTypes.func.isRequired,
    getMovies: PropTypes.func.isRequired,
    getAuditoriums: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
    data: state.data,
    UI: state.UI
})

const mapActionsToProps = {
    postScreening,
    getMovies,
    getAuditoriums,
    clearErrors
}


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostScreening));