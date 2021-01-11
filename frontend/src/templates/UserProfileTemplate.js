import React from 'react';
import { Grid, LinearProgress } from '@material-ui/core'
import {
  ProfileHeader,
  ProfileMenu,
  CardBase,
  TabPanel,
  GeneralForm,
  ProfilePictureForm,
  PasswordForm,
} from 'src/components/organisms'
import SectionAlternate from 'src/components/organisms/SectionAlternate'
import { makeStyles } from '@material-ui/core/styles'

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

function UserProfileTemplate({
  user,
  reFetchUser,
  passwordLoading,
  userLoading,
  profileImageLoading,
  onSaveUser,
  onSavePassword,
  onSaveProfileImage,
}) {
  const [pageId, setPageId] = React.useState('general');
  const classes = useStyles();
  const isLoading = userLoading || passwordLoading || profileImageLoading;

  return (
    <div className={classes.root}>
      {isLoading && <LinearProgress />}
      <ProfileHeader
        title="Váš profil sportovce"
        subtitle="Zde si můžete změnit veškeré vaše údaje."
      />
      {user && (
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
                    data={user}
                    reFetchData={reFetchUser}
                    onSave={onSaveUser}
                    loading={userLoading}
                  />
                </TabPanel>
                <TabPanel value={pageId} index="profilePhoto">
                  <ProfilePictureForm
                    imageURL={user?.imageURL}
                    reFetchUser={reFetchUser}
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
              </CardBase>
            </Grid>
          </Grid>
        </SectionAlternate>
      )}
    </div>
  );
}

export { UserProfileTemplate };
