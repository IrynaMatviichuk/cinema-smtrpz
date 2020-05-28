import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomButton from '../../util/CustomButton';

// Redux
import { connect } from 'react-redux';
import {
    postMovie,
    getGenres,
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
import MovieIcon from '@material-ui/icons/Movie';
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


class PostMovie extends Component {
        state = {
            open: false,
            title: '',
            duration: undefined,
            genre_id_fk: '',
            description: '',
            errors: {}
        };

    componentDidMount() {
        this.props.getGenres()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }

        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({
                title: '',
                duration: undefined,
                genre_id_fk: '',
                description: '',
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

        const newMovie = {
            title: this.state.title,
            duration: Number(this.state.duration),
            genre_id_fk: this.state.genre_id_fk,
            description: this.state.description
        };

        this.props.postMovie(newMovie);
    }

    render() {
        const { classes, data: { genres }, UI: { loading }} = this.props;
        const { errors } = this.state;

        return (
            <Fragment>
                <CustomButton onClick={this.handleOpen} tip="Post a movie">
                    <MovieIcon/>
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
                    <DialogTitle>Post a new movie</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="title"
                                type="text"
                                label="Title"
                                placeholder="title"
                                helperText={errors.title}
                                error={errors.title ? true : false}
                                value={this.state.title}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                name="duration"
                                type="number"
                                label="Duration"
                                placeholder="duration"
                                helperText={errors.duration}
                                error={errors.duration ? true : false}
                                value={this.state.duration}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <InputLabel shrink className={classes.label}>Genre</InputLabel>
                            <Select
                                name="genre_id_fk"
                                label="Genre"
                                value={this.state.genre_id_fk}
                                error={errors.genre_id_fk ? true : false}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            >
                                {!loading && (
                                    genres.map(genre => <MenuItem value={genre.genre_id}>{genre.name}</MenuItem>)
                                )}
                            </Select>
                            <FormHelperText error={errors.genre_id_fk ? true : false}>{errors.genre_id_fk}</FormHelperText>
                            <TextField
                                name="description"
                                type="text"
                                label="Description"
                                placeholder="description"
                                multiline
                                rows={6}
                                rowsMax={6}
                                helperText={errors.description}
                                error={errors.description ? true : false}
                                value={this.state.description}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
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


PostMovie.propTypes = {
    postMovie: PropTypes.func.isRequired,
    getGenres: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
    data: state.data,
    UI: state.UI
})

const mapActionsToProps = {
    postMovie,
    getGenres,
    clearErrors
}


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostMovie));