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

export function Button({
  children,
  variant,
  color,
  disabled,
  as: Component = 'button',
  ...rest
}) {
  const classes = useStyles();

  return (
    <Button
    variant='contained'
    color='primary'
    disabled={disabled}
    type='button'
    {...rest}
    >
    {children}
    </Button>
  );
}
