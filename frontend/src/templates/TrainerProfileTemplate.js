/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Grid, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SectionAlternate from 'src/components/organisms/SectionAlternate';
import {
  GeneralForm,
  PasswordForm,
  ProfileHeader,
  ProfilePictureForm,
  TabPanel,
  CardBase,
  ProfileMenu,
} from 'src/components/organisms';
import { Notifications } from 'src/components/organisms/account/components';

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
}));

function TrainerProfileTemplate({
  trainer,
  reFetchTrainer,
  trainerLoading,
  passwordLoading,
  profileImageLoading,
  onSaveTrainer,
  onSavePassword,
  onSaveProfileImage,
}) {
  const [pageId, setPageId] = React.useState('general');
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {(passwordLoading || trainerLoading || profileImageLoading) && (
        <LinearProgress />
      )}
      <ProfileHeader
        title="Váš profil trenéra"
        subtitle="Zde si můžete změnit veškeré vaše údaje."
      />
      {trainer && (
        <SectionAlternate className={classes.section}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <ProfileMenu
                pages={subPages}
                pageId={pageId}
                setPageId={setPageId}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <CardBase>
                <TabPanel value={pageId} index="general">
                  <GeneralForm
                    data={trainer}
                    reFetchData={reFetchTrainer}
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
                  <PasswordForm
                    onSave={onSavePassword}
                    loading={passwordLoading}
                  />
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
}

export { TrainerProfileTemplate };
