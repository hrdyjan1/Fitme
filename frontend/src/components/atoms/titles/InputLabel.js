import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  label: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
}));

const InputLabel = ({ label }) => {
  const classes = useStyles();

  return (
    <Typography
      variant="subtitle1"
      color="textPrimary"
      className={classes.label}
    >
      {label}
    </Typography>
  );
};

export { InputLabel };
