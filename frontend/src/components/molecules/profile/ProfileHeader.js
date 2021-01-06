/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { ProfileTitle, ProfileSubtitle } from 'src/components/atoms'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    background: theme.palette.primary.dark,
  },
  section: {
    maxWidth: theme.layout.contentWidth,
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(6, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(12, 2),
    },
  },
}));

const ProfileHeader = ({ title, subtitle }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <section className={classes.section}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ProfileTitle title={title}/>
          </Grid>
          {subtitle && (
            <Grid item xs={12}>
              <ProfileSubtitle subtitle={subtitle}/>
            </Grid>
          )}
        </Grid>
      </section>
    </div>
  );
};

export { ProfileHeader };
