import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';


// Redux
import { connect } from 'react-redux';
import { postFeedback } from '../../redux/actions/dataActions';

// MUI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

// Icons
import SendIcon from '@material-ui/icons/Send';


const styles = theme => ({
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        verticalAlign: 'bottom',
        marginBottom: 0,
        marginTop: 22
    }
})


class FeedbackForm extends Component {
    state = {
        score: 0,
        review: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }

        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({
                score: 0,
                review: '',
                errors: {}
            })
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = event => {
        event.preventDefault();
        const newFeedback = {
            score: Number(this.state.score),
            review: this.state.review,
            movie_id_fk: this.props.movieId,
            cinema_user_id_fk: this.props.user.cinema_user_id
        }

        this.props.postFeedback(newFeedback);
    }

    render() {
        const { classes, user: { authenticated, is_admin } } = this.props;
        const errors = this.state.errors;

        const feedbackFormMarkup = (authenticated && !is_admin) ? (
            <Grid item sm={12} style={{ textAlign: 'center' }}>
                <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid item sm={1}>
                            <InputLabel shrink className={classes.label}>Score</InputLabel>
                            <Select
                                name="score"
                                label="Score"
                                error={errors.score ? true : false}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            >
                                {Array.from(Array(10), (x, index) => index + 1).map(
                                    score => <MenuItem value={score}>{score}</MenuItem>
                                )}
                            </Select>
                            <FormHelperText error={errors.score ? true : false}>{errors.score}</FormHelperText>
                        </Grid>
                        <Grid item sm={9}>
                            <TextField
                                name="review"
                                type="text"
                                label="Leave a review"
                                error={errors.review ? true : false}
                                helperText={errors.review}
                                value={this.state.review}
                                onChange={this.handleChange}
                                fullWidth
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item sm={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                            >
                                Send
                    </Button>
                        </Grid>
                    </Grid>
                </form>
                <hr className={classes.visibleSeparator} />
            </Grid>
        ) : null;
        return feedbackFormMarkup;
    }
}


FeedbackForm.propTypes = {
    postFeedback: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    movieId: PropTypes.number.isRequired
}


const mapStateToProps = state => ({
    UI: state.UI,
    user: state.user
})


export default connect(mapStateToProps, { postFeedback })(withStyles(styles)(FeedbackForm));