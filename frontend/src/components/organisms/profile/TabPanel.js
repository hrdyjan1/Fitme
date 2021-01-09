import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}));

function TabPanel({ children, value, index }) {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      justifyContent="center"
      className={classes.root}
      hidden={value !== index}
    >
      {value === index && children}
    </Box>
  );
}

export { TabPanel };
