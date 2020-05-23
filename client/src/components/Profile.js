import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// Redux
import { logoutUser } from '../redux/actions/userActions';

// MUI
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';

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

        let admin = (
            <div>
                <WorkIcon color="primary"/>{' '}
                <span>administrator</span>
            </div>
        );

        let profileMarkup = !loading ? (authenticated && (
            <Paper className={classes.paper}>
                {/* <div className={classes.profile}>
                    .image
                </div> */}
                <div className="profile-details">
                    <p>profile image</p>
                    <MuiLink component={Link} to={`/users/${cinema_user_id}`} color="primary" variant="h5">
                        @{username}
                    </MuiLink>
                    <hr/>
                    <AccountBoxIcon color="primary"/>{' '}
                    <span>{firstname} {lastname}</span>
                    <br/>
                    {is_admin && admin}
                    <p>number of reserved tickets</p>
                    <p>total number of reserved tickets</p>
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
