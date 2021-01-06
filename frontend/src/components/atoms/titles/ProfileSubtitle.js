import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  textWhite: {
    color: 'white',
  }
}));

const ProfileSubtitle = ({ subtitle }) => {
  const classes = useStyles();
  return (
    <Typography
      variant="h6"
      align="left"
      color="textSecondary"
      className={classes.textWhite}
    >
      {subtitle}
    </Typography>
  );
};

export { ProfileSubtitle };
