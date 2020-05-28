import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomButton from '../../util/CustomButton';
import PostScreening from '../screening/PostScreening';
import PostMovie from '../movie/PostMovie';

// Redux
import { logoutUser } from '../../redux/actions/userActions';

// MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

// Icons
import HomeIcon from '@material-ui/icons/Home';
import TheatersIcon from '@material-ui/icons/Theaters';


const styles = (theme) => ({})


class Navbar extends Component {
    handleLogout = () => {
        this.props.logoutUser();
    }

    render() {
        const { classes, user: { authenticated, is_admin, cinema_user_id } } = this.props;
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            {is_admin && <PostMovie />}
                            {is_admin && <PostScreening />}
                            {!is_admin && (
                                <Link to={`/bookings/user/${cinema_user_id}`}>
                                    <CustomButton tip="My bookings">
                                        <TheatersIcon />
                                    </CustomButton>
                                </Link>
                            )}
                            {is_admin && (
                                <Link to="/bookings/admin">
                                    <CustomButton tip="Bookings">
                                        <TheatersIcon />
                                    </CustomButton>
                                </Link>
                            )}
                            <Link to="/">
                                <CustomButton tip="Home">
                                    <HomeIcon />
                                </CustomButton>
                            </Link>
                            <Button className={classes.logout} color="inherit" onClick={this.handleLogout}>
                                Logout
                            </Button>
                        </Fragment>
                    ) : (
                            <Fragment>
                                <Button color="inherit" component={Link} to="/">
                                    Home
                                </Button>
                                <Button color="inherit" component={Link} to="/login">
                                    Login
                                </Button>
                                <Button color="inherit" component={Link} to="/signup">
                                    Signup
                                </Button>
                            </Fragment>
                        )}
                </Toolbar>
            </AppBar>
        )
    }
}


Navbar.propTypes = {
    // authenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
}


const mapStateToProps = (state) => ({
    // authenticated: state.user.authenticated
    user: state.user
});


const mapActionsToProps = {
    logoutUser
};


export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Navbar));