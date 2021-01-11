/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Divider } from '@material-ui/core';
import { FormTitle } from 'src/components/atoms';
import { TrainerCard } from 'src/components/molecules';
import { AddTrainerForm } from 'src/components/organisms';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
  list: {
    width: '100%'
  },
  marginTop: {
    marginTop: '25px'
  },
}));

const Trainers = ({
  trainers,
  placeTrainers,
  reFetchPlaceTrainers,
  onSave,
  onDelete,
  addTrainerLoading,
  deleteTrainerLoading,
}) => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const onDeleteTrainer = (id) => {
    onDelete(id).then(() => {
      reFetchPlaceTrainers();
    });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <FormTitle title="Trenéři"   />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item container justify="center">
          <Grid container spacing={isMd ? 2 : 1}>
            {placeTrainers.map((item) => (
              <Grid item sm={6} key={item.id} data-aos="fade-up">
                <TrainerCard
                  name={`${item.firstName} ${item.lastName}`}
                  imageSrc={item.imageURL}
                  description={item.description}
                  onDelete={() => onDeleteTrainer(item.id)}
                  loading={deleteTrainerLoading}
                />
              </Grid>
            ))}
            {!placeTrainers.length && (
              <FormTitle title="Sportoviště nemá žádné trenéry" />
            )}
          </Grid>
          <Grid item xs={12} className={classes.marginTop}>
            <Divider />
          </Grid>
          <Grid item container justify="center" xs={12} className={classes.marginTop}>
            <AddTrainerForm
              trainers={trainers}
              placeTrainers={placeTrainers}
              reFetchData={reFetchPlaceTrainers}
              onSave={onSave}
              loading={addTrainerLoading}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export { Trainers };
