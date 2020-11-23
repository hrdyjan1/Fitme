/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.layout.contentWidth,
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(6, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(12, 2),
    },
  },
  fullWidth: {
    maxWidth: '100%',
  },
  disablePadding: {
    padding: 0,
  },
  narrow: {
    maxWidth: 800,
  },
}));

const Section = (props) => {
  const {
    children,
    fullWidth,
    narrow,
    disablePadding,
    alternate,
    className,
    ...rest
  } = props;

  const classes = useStyles();

  return (
    <section
      className={clsx(
        'section',
        classes.root,
        fullWidth ? classes.fullWidth : {},
        narrow ? classes.narrow : {},
        disablePadding ? classes.disablePadding : {},
        alternate ? classes.alternate : {},
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
};

export default Section;
