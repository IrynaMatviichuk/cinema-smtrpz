import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const AdminRoute = ({ component: Component, authenticated, is_admin, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            is_admin === true ? <Component {...props} />: <Redirect to="/login" />
        }
    />
);


const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
    is_admin: state.user.is_admin
});


AdminRoute.propTypes = {
    user: PropTypes.object.isRequired
}


export default connect(mapStateToProps)(AdminRoute);