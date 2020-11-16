import React from 'react';
import { gql, useQuery } from '@apollo/client';

import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  Box, Card, Grid, makeStyles,
} from '@material-ui/core';

import { isFilledArray } from 'src/constants/array';
import { red } from '@material-ui/core/colors';

const GET_PLACES = gql`
  query GetPlaces {
    places {
      id
      name
      description
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: '#3f51b5',
  },
}));

export function HomePage() {
  const classes = useStyles();
  const { data } = useQuery(GET_PLACES);
  const places = isFilledArray(data?.places) ? data?.places : null;

  return (
    <div>
      <h1>Fit.me</h1>
      <h3>Sportoviště</h3>
      <Box maxWidth="1200px" margin="auto">
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {places
          && places.map((p) => (
            <Grid item xs={12} sm={6} md={3} key={p.id}>
              <Card className={classes.root}>
                <CardHeader
                  avatar={(
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      {p.name[0]}
                    </Avatar>
                  )}
                  action={(
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  )}
                  title={p.name}
                  subheader="Sportovní areál"
                />
                <CardMedia
                  className={classes.media}
                  image="https://i.ytimg.com/vi/w-oHc3Fk9Xo/maxresdefault.jpg"
                  title="Paella dish"
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {p.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

    </div>
  );
}
