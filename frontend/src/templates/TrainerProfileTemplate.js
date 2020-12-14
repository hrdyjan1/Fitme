/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import clsx from 'clsx';
import {
  Box, List, ListItem, Grid, Typography, LinearProgress
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import CardBase from 'src/components/organisms/cardBase';
import SectionAlternate from 'src/components/organisms/SectionAlternate';
import {
  GeneralForm, PasswordForm,
  ProfileHeader,
  ProfilePictureForm
} from 'src/components/organisms'
import { Notifications } from 'src/components/organisms/account/components';

const TabPanel = ({
                    children, value, index, ...other
                  }) => (
  <Box display="flex" justifyContent="center" hidden={value !== index} {...other}>
    {value === index && children}
  </Box>
);

const subPages = [
  {
    id: 'general',
    title: 'Obecné',
  },
  {
    id: 'profilePhoto',
    title: 'Profilová fotka',
  },
  {
    id: 'password',
    title: 'Heslo',
  },
  {
    id: 'tags',
    title: 'Nabízené disciplíny',
  }
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

function TrainerProfileTemplate({
  trainer,
  reFetchTrainer,
  trainerLoading,
  passwordLoading,
  profileImageLoading,
  onSaveTrainer,
  onSavePassword,
  onSaveProfileImage
}) {
  const [pageId, setPageId] = React.useState('general');
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {(passwordLoading || trainerLoading || profileImageLoading) && (
        <LinearProgress />
      )}
      <ProfileHeader title="Váš profil trenéra" subtitle="Zde si můžete změnit veškeré vaše údaje."/>
      {trainer && (
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
                <GeneralForm
                  user={trainer}
                  reFetchUser={reFetchTrainer}
                  onSave={onSaveTrainer}
                  loading={trainerLoading}
                />
              </TabPanel>
              <TabPanel value={pageId} index="profilePhoto">
                <ProfilePictureForm
                  imageURL={trainer?.imageURL}
                  reFetchUser={reFetchTrainer}
                  onSave={onSaveProfileImage}
                  loading={profileImageLoading}
                />
              </TabPanel>
              <TabPanel value={pageId} index="password">
                <PasswordForm onSave={onSavePassword} loading={passwordLoading} />
              </TabPanel>
              <TabPanel value={pageId} index="tags">
                <Notifications place={trainer} />
              </TabPanel>
            </CardBase>
          </Grid>
        </Grid>
      </SectionAlternate>
      )}
    </div>
  );
};

export { TrainerProfileTemplate };
