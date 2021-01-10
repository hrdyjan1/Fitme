/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Button, Typography} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
  image: {
    objectFit: 'cover',
    transitionDuration: '.6s',
    transform: 'scale(1.0)',
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
  folioTitle: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
}));

const GalleryImage = ({ title, src, srcSet, alt, onDelete }) => {
  const classes = useStyles();

  return (
    <div className={classes.folioItem}>
      <img
        className={clsx('image', 'folio__image', classes.root, classes.image)}
        alt={alt}
        src={src}
        srcSet={srcSet}
        width="100%"
        height="100%"
      />
      <div
        className={clsx(
          'folio__info-wrapper',
          classes.folioInfoWrapper,
        )}
      >
        <div>
          <Typography variant="h6" className={classes.folioTitle}>
            {title}
          </Typography>
          <Button variant="contained" color="secondary" onClick={onDelete}>
            Odebrat
          </Button>
        </div>
      </div>
    </div>
  );
};

export { GalleryImage };
