/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.alternate.main,
  },
  inner: {
    maxWidth: theme.layout.contentWidth,
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(6, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(12, 2),
    },
  },
  innerNarrowed: {
    maxWidth: 800,
  },
}));

const SectionAlternate = ({ children, className }) => {
  const classes = useStyles();

  return (
    <section className={clsx('section-alternate', classes.root, className)}>
      <div className={clsx('section-alternate__content', classes.inner)}>
        {children}
      </div>
    </section>
  );
};

export default SectionAlternate;
