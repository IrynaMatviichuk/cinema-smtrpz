import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomButton from '../../util/CustomButton';

// Redux
import { connect } from 'react-redux';
import { updateMovie, clearErrors } from '../../redux/actions/dataActions';

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
        top: '55px'
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


class UpdateMovie extends Component {
    state = {
        open: false,
        title: '',
        duration: undefined,
        genre_id_fk: '',
        description: '',
        errors: {}
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
        const movie = this.props.movies.find(movie => movie.movie_id === this.props.movieId);
        this.setState({
            title: movie.title,
            duration: movie.duration,
            genre_id_fk: movie.genre.genre_id,
            description: movie.description
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

        const updatedMovie = {
            title: this.state.title,
            duration: Number(this.state.duration),
            genre_id_fk: this.state.genre_id_fk,
            description: this.state.description
        }

        this.props.updateMovie(updatedMovie, this.props.movieId);
    }

    render() {
        const {
            classes,
            genres,
            UI: {
                loading
            } 
        } = this.props;
        const { errors } = this.state;

        return (
            <Fragment>
                <CustomButton onClick={this.handleOpen} tip="Update movie" tipClassName={classes.updateButton}>
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
                    <DialogTitle>Update a movie</DialogTitle>
                    <DialogContent className={classes.dialogContent}>
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
                                InputLabelProps={{ shrink: true }}
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
                                InputLabelProps={{ shrink: true }}
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


UpdateMovie.propTypes = {
    updateMovie: PropTypes.func.isRequired,
    movieId: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    movies: PropTypes.object.isRequired,
    genres: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
    movies: state.data.movies,
    genres: state.data.genres,
    UI: state.UI
})


const mapActionsToProps = {
    updateMovie,
    clearErrors
}


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(UpdateMovie));