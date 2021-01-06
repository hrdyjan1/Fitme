import React from 'react';
import { Typography } from '@material-ui/core'

const FormTitle = ({ title }) => {
  return (
    <Typography variant="h6" color="textPrimary">
      {title}
    </Typography>
  )
};

export { FormTitle };
