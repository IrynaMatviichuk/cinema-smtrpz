import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI
import Card from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const styles = {
    card: {
        display: 'flex',
    }
}


class Screening extends Component {
    render() {
        const {
            classes,
            screening: {
                auditorium,
                end_time,
                movie: {
                    description,
                    duration,
                    genre: {
                        genre_id,
                        name
                    },
                    movie_id,
                    title
                },
                price,
                screening_date,
                screening_id,
                start_time }
            } = this.props;

        return (
            <Card variant="outlined">
                {/* <CardMedia // image={us} 
                title="Movie images"/> */}
                <CardContent>
                    <Typography variant="h5" component={Link} to ={`/movie/${movie_id}`} color="primary">{title}</Typography>
                    <Typography variant="body2" color="textSecondary">Date: {screening_date}</Typography>
                    <Typography variant="body2" color="textSecondary">Time: {start_time}</Typography>
                    <Typography variant="body2" color="textSecondary">Duration: {duration} min</Typography>
                    <Typography variant="body2" color="textSecondary">Genre: {name}</Typography>
                    <Typography variant="body1">Price: {price} UAH</Typography>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(Screening);