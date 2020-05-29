import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Movie from '../components/movie/Movie';
import Profile from '../components/Profile';

// Redux
import { connect } from 'react-redux';
import { getMovies, getGenres, searchMovies } from '../redux/actions/dataActions';

// MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

// Icons
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const styles = {
    searchField: {
        margin: '10px auto 10px auto'
    },
    card: {
        position: 'relative',
        marginBottom: 10,
        marginRight: 20

    },
    content: {
        padding: 25
    },
    dateParameter: {
        position: 'absolute',
        top: '65%',
        left: '92%'
    }
}


class movies extends Component {
    state = {
        movieId: -1,
        genreId: -1,
        sortingOrder: 0,
        screeningDate: undefined,
        checkDate: false
    }

    componentDidMount() {
        this.props.getMovies();
        this.props.getGenres();
    }

    handleSearch = () => {
        const searchParameters = {
            movieId: this.state.movieId,
            genreId: this.state.genreId,
            sortingOrder: this.state.sortingOrder,
            screeningDate: this.state.checkDate ? this.state.screeningDate : false,
        }
        console.log(searchParameters);

        this.props.searchMovies(searchParameters);
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleCheck = event => {
        this.setState({ [event.target.name]: event.target.checked });
    }

    render() {
        const { classes, data: { movies, moviesToDisplay, genres, loading }, authenticated } = this.props;
        console.log(moviesToDisplay);
        const filterPanel = (
            <Card className={classes.card}>
                <Paper className={classes.card}>
                    <CardContent className={classes.content}>
                        <Select
                            name="movieId"
                            label="Movie"
                            value={this.state.movieId}
                            className={classes.searchField}
                            onChange={this.handleChange}
                            fullWidth
                        >
                            <MenuItem value={-1}>search by movie title</MenuItem>
                            {!loading && (
                                movies.map(movie => <MenuItem value={movie.movie_id}>{movie.title}</MenuItem>)
                            )}
                        </Select>
                        <Select
                            name="genreId"
                            label="Genre"
                            value={this.state.genreId}
                            className={classes.searchField}
                            onChange={this.handleChange}
                            fullWidth
                        >
                            <MenuItem value={-1}>search by genre</MenuItem>
                            {!loading && (
                                genres.map(genre => <MenuItem value={genre.genre_id}>{genre.name}</MenuItem>)
                            )}
                        </Select>
                        <Select
                            name="sortingOrder"
                            label="Sorting order"
                            value={this.state.sortingOrder}
                            className={classes.searchField}
                            onChange={this.handleChange}
                            fullWidth
                        >
                            <MenuItem value={-1}>
                                <ExpandMoreIcon />
                                descending
                            </MenuItem>
                            <MenuItem value={0}>sorting order</MenuItem>
                            <MenuItem value={1}>
                                <ExpandLessIcon />
                                ascending
                            </MenuItem>
                        </Select>
                        <div>
                        <TextField
                            name="screeningDate"
                            type="date"
                            label="Screening date"
                            value={this.state.screeningDate}
                            className={classes.searchField}
                            onChange={this.handleChange}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            style={{maxWidth:'685px'}}
                        />
                        <Checkbox
                            name="checkDate"
                            checked={this.state.checkDate}
                            onChange={this.handleCheck}
                            className={classes.dateParameter}
                            color="primary"
                        />
                        </div>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={this.handleSearch}
                        >
                            Search
                        </Button>
                    </CardContent>
                </Paper>
            </Card>
        )

        const moviesMarkup = !loading ? (
            moviesToDisplay.map(movie => <Movie key={movie.movie_id} movie={movie} />)
        ) : (<p>Loading ...</p>);

        return (
            <Grid container spacing={16}>
                <Grid item sm={8} xs={12}>
                    {filterPanel}
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
    getGenres: PropTypes.func.isRequired,
    searchMovies: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    // movie: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired
}


const mapStateToProps = state => ({
    data: state.data,
    // movie: state.data.movie,
    authenticated: state.user.authenticated
})


const mapActionsToProps = {
    getMovies,
    getGenres,
    searchMovies
}


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(movies));