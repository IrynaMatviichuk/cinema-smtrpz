import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import Movie from '../components/movie/Movie';
import Profile from '../components/Profile';

// Redux
import { connect } from 'react-redux';
import { getMovies } from '../redux/actions/dataActions';


class movies extends Component {
    componentDidMount() {
        this.props.getMovies();
    }

    render() {
        const { data: { movies, loading }, authenticated} = this.props;
        let moviesMarkup = !loading ? (
            movies.map(movie => <Movie key={movie.movie_id} movie={movie} />)
        ) : (<p>Loading ...</p>);
        return (
            <Grid container spacing={16}>
                <Grid item sm={8} xs={12}>
                    {moviesMarkup}
                </Grid>
                {authenticated && (
                    <Grid item sm={4} xs={12}>
                        <Profile />
                    </Grid>
                )}
            </Grid>
        );
    }
}


movies.propTypes = {
    getMovies: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired
}


const mapStateToProps = state => ({
    data: state.data,
    authenticated: state.user.authenticated
})


export default connect(mapStateToProps, { getMovies })(movies);