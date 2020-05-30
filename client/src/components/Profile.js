import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomButton from '../util/CustomButton';

// Redux
import { logoutUser } from '../redux/actions/userActions';

// MUI
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

// Icons
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import WorkIcon from '@material-ui/icons/Work';


const styles = (theme) => ({
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    },
    linkButton: {
        marginTop: '10px'
    }
});


class Profile extends Component {
    render() {
        const { classes, user: {
            authenticated,
            cinema_user_id,
            username,
            firstname,
            lastname,
            is_admin
        }, loading
        } = this.props;

        const adminMarkup = (
            <div>
                <CustomButton tip="Administrator">
                    <WorkIcon color="primary" />
                </CustomButton>
                <span>administrator</span>
                <hr />
                <Button
                    color="primary"
                    variant="contained"
                    className={classes.bookButton}
                    component={Link}
                    to="/"
                    fullWidth
                >
                    movies
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    className={classes.linkButton}
                    component={Link}
                    to="/screenings"
                    fullWidth
                >
                    screenings
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    className={classes.linkButton}
                    component={Link}
                    to="/bookings"
                    fullWidth
                >
                    bookings
                </Button>
            </div>
        );

        const userMarkup = (
            <div>
                <hr />
                <Button
                    color="primary"
                    variant="contained"
                    className={classes.bookButton}
                    component={Link}
                    to="/"
                    fullWidth
                >
                    movies
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    className={classes.linkButton}
                    component={Link}
                    to={`/bookings/user/${cinema_user_id}`}
                    fullWidth
                >
                    bookings
                </Button>

            </div>
        );

        const profileMarkup = !loading ? (authenticated && (
            <Paper className={classes.paper}>
                <div className="profile-details">
                    <MuiLink component={Link} to={`/bookings/user/${cinema_user_id}`} color="primary" variant="h5">
                        @{username}
                    </MuiLink>
                    <hr />
                    <CustomButton tip="Account">
                        <AccountBoxIcon color="primary" />
                    </CustomButton>
                    <span>{firstname} {lastname}</span>
                    <br />
                    {is_admin ? adminMarkup : userMarkup}
                </div>
            </Paper>
        )) : (<p>loading...</p>);

        return profileMarkup;
    }
}


const mapStateToProps = (state) => ({
    user: state.user
});


const mapActionsToProps = {
    logoutUser
};


Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
}


export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Profile));
