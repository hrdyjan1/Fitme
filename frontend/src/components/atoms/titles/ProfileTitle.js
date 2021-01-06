import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  textWhite: {
    color: 'white',
  },
  title: {
    fontWeight: 'bold',
  },
}));

const ProfileTitle = ({ title }) => {
  const classes = useStyles();
  return (
    <Typography
      variant="h3"
      align="left"
      color="textPrimary"
      className={clsx(classes.title, classes.textWhite)}
    >
      {title}
    </Typography>
  );
};

export { ProfileTitle };
