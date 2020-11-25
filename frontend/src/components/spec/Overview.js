/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { Image } from 'src/components/atoms/image';
import { SectionHeader } from 'src/components/molecules/sectionHeader';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.dark,
    borderRadius: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      paddingBottom: 0,
    },
  },
  textWhite: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    fontSize: 22,
  },
  image: {
    objectFit: 'contain',
    maxWidth: '90%',
    width: 300,
    [theme.breakpoints.down('sm')]: {
      width: 200,
      height: 200,
    },
    padding: 10,
  },
  imageLeftContainer: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  imageRightContainer: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  imageLeft: {
    objectFit: 'cover',
  },
  copy: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(0, 2),
  },
}));

const Overview = (props) => {
  const classes = useStyles();
  const { className, ...rest } = props;

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid container data-aos="fade-up">
        <Grid
          item
          container
          alignItems="flex-start"
          className={classes.imageLeftContainer}
          sm={12}
          md={4}
        >
          <Image
            src="/basket.jpg"
            className={clsx(classes.image, classes.imageLeft)}
          />
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          sm={12}
          md={4}
          className={classes.copy}
        >
          <SectionHeader
            title={(
              <span className={clsx(classes.textWhite, classes.title)}>
                Sportoviste na jednom miste
              </span>
            )}
            subtitle={(
              <span className={classes.textWhite}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                fermentum risus id tortor. Sed elit dui, pellentesque a,
                faucibus vel, interdum nec, diam. Aliquam ante.
              </span>
            )}
            ctaGroup={[
              <Button variant="contained" color="primary" size="large">
                Learn more
              </Button>,
            ]}
            align="center"
            subtitleProps={{ align: 'justify' }}
            disableGutter
          />
        </Grid>
        <Grid
          item
          container
          justify="flex-end"
          md={4}
          className={classes.imageRightContainer}
        >
          <Image src="/basket.jpg" className={classes.image} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Overview;
