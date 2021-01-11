/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import clsx from 'clsx';
import {
  Box, List, ListItem, Grid, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CardBase from 'src/components/organisms/cardBase';
import SectionAlternate from 'src/components/organisms/SectionAlternate';
import {
  Hero,
  General,
  Security,
  Notifications,
  Billing,
  Gallery,
} from './components';

const TabPanel = ({
  children, value, index, ...other
}) => (
  <Box component="div" hidden={value !== index} {...other}>
    {value === index && children}
  </Box>
);

const subPages = [
  {
    id: 'general',
    title: 'Obecné',
  },
  {
    id: 'photos',
    title: 'Fotografie',
  },
  {
    id: 'security',
    title: 'Heslo',
  },
  {
    id: 'tags',
    title: 'Nabízené disciplíny',
  },
  {
    id: 'trainers',
    title: 'Trenéři',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
  },
  section: {
    '& .section-alternate__content': {
      paddingTop: 0,
      marginTop: theme.spacing(-5),
      position: 'relative',
      zIndex: 1,
    },
    '& .card-base__content': {
      padding: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3),
      },
    },
  },
  menu: {
    height: 'auto',
  },
  list: {
    display: 'inline-flex',
    overflow: 'auto',
    flexWrap: 'nowrap',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'column',
      marginRight: theme.spacing(-3),
      marginLeft: theme.spacing(-3),
    },
  },
  listItem: {
    cursor: 'pointer',
    marginRight: theme.spacing(2),
    flex: 0,
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(3),
      paddingLeft: theme.spacing(3),
      borderLeft: '2px solid transparent',
    },
  },
  listItemActive: {
    [theme.breakpoints.up('md')]: {
      borderLeft: `2px solid ${theme.palette.primary.dark}`,
    },
    '& .menu__item': {
      color: theme.palette.text.primary,
    },
  },
}));

function Template({ place }) {
  const [pageId, setPageId] = React.useState('general');
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Hero />
      <SectionAlternate className={classes.section}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <CardBase withShadow align="left" className={classes.menu}>
              <List disablePadding className={classes.list}>
                {subPages.map((item) => (
                  <ListItem
                    key={item.id}
                    component="a"
                    className={clsx(
                      classes.listItem,
                      pageId === item.id ? classes.listItemActive : {},
                    )}
                    onClick={() => setPageId(item.id)}
                    disableGutters
                  >
                    <Typography
                      variant="subtitle1"
                      noWrap
                      color="textSecondary"
                      className="menu__item"
                    >
                      {item.title}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </CardBase>
          </Grid>
          <Grid item xs={12} md={9}>
            <CardBase withShadow align="left">
              <TabPanel value={pageId} index="general">
                <General place={place} />
              </TabPanel>
              <TabPanel value={pageId} index="photos">
                <Gallery place={place} />
              </TabPanel>
              <TabPanel value={pageId} index="security">
                <Security place={place} />
              </TabPanel>
              <TabPanel value={pageId} index="tags">
                <Notifications place={place} />
              </TabPanel>
              <TabPanel value={pageId} index="trainers">
                <Billing place={place} />
              </TabPanel>
            </CardBase>
          </Grid>
        </Grid>
      </SectionAlternate>
    </div>
  );
}

export { Template };
