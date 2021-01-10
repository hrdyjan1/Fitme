import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Hero, Overview } from 'src/components/molecules';
import Section from 'src/components/organisms/Section';

import SportPlace from 'src/components/organisms/sportPlace';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  pagePaddingTop: {
    paddingTop: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(5),
    },
    paddingBottom: theme.spacing(1),
  },
  pagePaddingTopBottom: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      paddingBottom: theme.spacing(5),
    },
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: '#3f51b5',
  },
}));

export function HomePage() {
  const classes = useStyles();

  return (
    <div>
      <Section className={classes.pagePaddingTop}>
        <Hero />
      </Section>
      <Section className={classes.pagePaddingTopBottom}>
        <Overview />
      </Section>
      <Section>
        <SportPlace includeFilter={false} />
      </Section>
    </div>
  );
}
