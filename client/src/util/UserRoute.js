import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const UserRoute = ({ component: Component, authenticated, is_admin, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            authenticated && is_admin === false ? <Component {...props} />: <Redirect to="/login" />
        }
    />
);


const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
    is_admin: state.user.is_admin
});


UserRoute.propTypes = {
    user: PropTypes.object.isRequired
}


export default connect(mapStateToProps)(UserRoute);