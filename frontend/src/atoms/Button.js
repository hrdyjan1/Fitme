import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export function DefaultButton({
  children,
  variant,
  color,
  disabled,
  ...rest
}) {
    return (
      <Button
        variant='contained'
        color='primary'
        disabled={disabled}
        {...rest}
      >
        {children}
      </Button>
  );
}
