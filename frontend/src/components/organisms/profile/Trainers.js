/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  Divider,
} from '@material-ui/core'
import { FormTitle } from 'src/components/atoms'
import { TrainerCard } from 'src/components/molecules'
import { AddTrainerForm } from 'src/components/organisms'

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    justifyItems: 'center',
  }
}));

const Trainers = ({
                      trainers,
                      placeTrainers,
                      reFetchPlaceTrainers,
                      onSave,
                      onDelete,
                      addTrainerLoading,
                      deleteTrainerLoading
                    }) => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <FormTitle title="Trenéři"/>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid container spacing={isMd ? 2 : 1} justify="center">
          {placeTrainers.map((item, index) => (
            <Grid item sm={6} key={index} data-aos="fade-up">
              <TrainerCard
                 id={item.id}
                 name={`${item.firstName} ${item.lastName}`}
                 imageSrc={item.imageURL}
                 description={item.description}
                 onDelete={onDelete}
                 loading={deleteTrainerLoading}
              />
            </Grid>
          ))}
          {placeTrainers.length || <FormTitle title={'Sportoviště nemá žádné trenéry' }/>}
        </Grid>
        <Grid item xs={12} md={6}>
          <AddTrainerForm
            trainers={trainers}
            placeTrainers={placeTrainers}
            reFetchData={reFetchPlaceTrainers}
            onSave={onSave}
            loading={addTrainerLoading}
          />
        </Grid>

      </Grid>
    </div>
  );
};

export { Trainers };
