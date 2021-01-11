/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent } from '@material-ui/core';
import { noop } from 'src/constants/functions/basic';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'auto',
    width: '100%',
    boxShadow: `0 2px 10px 0 ${theme.palette.cardShadow}`,
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(4, 2),
    '&:last-child': {
      padding: theme.spacing(4, 2),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6, 3),
      '&:last-child': {
        padding: theme.spacing(6, 3),
      },
    },
  },
}));

const CardBase = ({ className, onClick = noop, children }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx('card-base', classes.root, className)}
      onClick={onClick}
    >
      <CardContent className={clsx('card-base__content', classes.content)}>
        {children}
      </CardContent>
    </Card>
  );
};

export { CardBase };
