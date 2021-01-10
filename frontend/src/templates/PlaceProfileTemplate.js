/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Grid, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SectionAlternate from 'src/components/organisms/SectionAlternate';
import {
  GeneralForm,
  PasswordForm,
  ProfileHeader,
  TabPanel,
  CardBase,
  ProfileMenu,
  Gallery,
  SportTypes,
  Trainers,
} from 'src/components/organisms';

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
    id: 'password',
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
}));

function PlaceProfileTemplate({
  place,
  sportTypes,
  placeSportTypes,
  trainers,
  placeTrainers,
  reFetchPlace,
  reFetchPlaceSportTypes,
  reFetchPlaceTrainers,
  placeLoading,
  passwordLoading,
  uploadPlaceImageLoading,
  deletePlaceImageLoading,
  addSportTypeLoading,
  deleteSportTypeLoading,
  addPlaceTrainerLoading,
  deletePlaceTrainerLoading,
  onSavePlace,
  onSavePassword,
  onSavePlaceImage,
  onDeletePlaceImage,
  onSaveSportType,
  onDeleteSportType,
  onSavePlaceTrainer,
  onDeletePlaceTrainer,
}) {
  const [pageId, setPageId] = React.useState('general');
  const classes = useStyles();
  const isLoading =
    passwordLoading ||
    placeLoading ||
    uploadPlaceImageLoading ||
    deletePlaceImageLoading ||
    addSportTypeLoading ||
    deleteSportTypeLoading ||
    addPlaceTrainerLoading ||
    deletePlaceTrainerLoading;

  return (
    <div className={classes.root}>
      {isLoading && <LinearProgress />}
      <ProfileHeader
        title="Váš profil sportoviště"
        subtitle="Zde si můžete změnit veškeré údaje o vašem sportovišti."
      />
      {place && (
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
                    data={place}
                    reFetchData={reFetchPlace}
                    onSave={onSavePlace}
                    loading={placeLoading}
                  />
                </TabPanel>
                <TabPanel value={pageId} index="photos">
                  <Gallery
                    name={place?.name}
                    images={place?.pictureList}
                    reFetchData={reFetchPlace}
                    onSave={onSavePlaceImage}
                    onDelete={onDeletePlaceImage}
                  />
                </TabPanel>
                <TabPanel value={pageId} index="password">
                  <PasswordForm
                    onSave={onSavePassword}
                    loading={passwordLoading}
                  />
                </TabPanel>
                <TabPanel value={pageId} index="tags">
                  <SportTypes
                    sportTypes={sportTypes}
                    placeSportTypes={placeSportTypes}
                    reFetchPlaceSportTypes={reFetchPlaceSportTypes}
                    onSave={onSaveSportType}
                    onDelete={onDeleteSportType}
                    addSportTypeLoading={addSportTypeLoading}
                    deleteSportTypeLoading={deleteSportTypeLoading}
                  />
                </TabPanel>
                <TabPanel value={pageId} index="trainers">
                  <Trainers
                    trainers={trainers}
                    placeTrainers={placeTrainers}
                    reFetchPlaceTrainers={reFetchPlaceTrainers}
                    onSave={onSavePlaceTrainer}
                    onDelete={onDeletePlaceTrainer}
                    addTrainerLoading={addPlaceTrainerLoading}
                    deleteTrainerLoading={deletePlaceTrainerLoading}
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

export { PlaceProfileTemplate };
