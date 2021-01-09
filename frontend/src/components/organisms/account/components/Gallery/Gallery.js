/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  GridList,
  GridListTile,
  Typography,
  Button,
  Grid,
  Divider,
  Box,
} from '@material-ui/core';
import { GalleryImage } from 'src/components/molecules/image/GalleryImage';

const useStyles = makeStyles((theme) => ({
  root: {},
  folioItem: {
    borderRadius: 4,
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
    '&:hover': {
      '& .folio__image': {
        transform: 'scale(1.4)',
      },
      '& .folio__info-wrapper': {
        top: 0,
      },
    },
  },
  folioInfoWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: '100%',
    backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 2%, #000000)',
    padding: theme.spacing(4, 2),
    transition: 'top .6s',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
    },
  },
  image: {
    objectFit: 'cover',
    transitionDuration: '.6s',
    transform: 'scale(1.0)',
  },
  folioTitle: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  folioSubtitle: {
    color: 'white',
    textTransform: 'capitalize',
    margin: theme.spacing(1, 0),
  },
}));

export const data = [
  {
    cover: 'https://i.ytimg.com/vi/w-oHc3Fk9Xo/maxresdefault.jpg',
    title: 'Sportoviste',
    cols: 1,
  },
  {
    cover: 'https://i.ytimg.com/vi/w-oHc3Fk9Xo/maxresdefault.jpg',
    title: 'Sportoviste',
    cols: 1,
  },
  {
    cover: 'https://i.ytimg.com/vi/w-oHc3Fk9Xo/maxresdefault.jpg',
    title: 'Sportoviste',
    cols: 1,
  },
  {
    cover: 'https://i.ytimg.com/vi/w-oHc3Fk9Xo/maxresdefault.jpg',
    title: 'Sportoviste',
    cols: 1,
  },
  {
    cover: 'https://i.ytimg.com/vi/w-oHc3Fk9Xo/maxresdefault.jpg',
    title: 'Sportoviste',
    cols: 1,
  },
];

const Gallery = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid container spacing={isMd ? 4 : 2}>

        <Grid item xs={12}>
          <Typography variant="h6" color="textPrimary">
            Přidání nebo odebrání fotografie
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Grid>

      <Box marginY={4}>
        <GridList cellHeight={isMd ? 260 : 160} cols={3} spacing={isMd ? 24 : 8}>
          {data.map((item, index) => (
            <GridListTile key={index} cols={isMd ? item.cols : 3 || 1}>
              <div className={classes.folioItem}>
                <GalleryImage
                  src={item.cover}
                  alt={item.title}
                  className={clsx('folio__image', classes.image)}
                  lazyProps={{ width: '100%', height: '100%' }}
                />
                <div
                  className={clsx(
                    'folio__info-wrapper',
                    classes.folioInfoWrapper,
                  )}
                >
                  <div className={classes.folioInfo}>
                    <Typography variant="h6" className={classes.folioTitle}>
                      {item.title}
                    </Typography>
                    <Button variant="contained" color="secondary">
                      Odebrat
                    </Button>
                  </div>
                </div>
              </div>
            </GridListTile>
          ))}
        </GridList>
      </Box>
      <Grid item container justify="center" xs={12}>
        <Button
          variant="contained"
          type="submit"
          color="primary"
          size="large"
        >
          Přidat
        </Button>
      </Grid>
    </div>
  );
};

export default Gallery;
