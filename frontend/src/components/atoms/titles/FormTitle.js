import React from 'react';
import { Typography } from '@material-ui/core';

const FormTitle = ({ title }) => (
  <Typography variant="h6" color="textPrimary">
    {title}
  </Typography>
);

export { FormTitle };
