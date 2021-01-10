/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  Divider,
} from '@material-ui/core';
import { FormTitle, SportTypeChip } from 'src/components/atoms';
import { AddSportTypeForm } from 'src/components/organisms';

const useStyles = makeStyles((theme) => ({
  titleCta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const SportTypes = ({
  sportTypes,
  placeSportTypes,
  reFetchPlaceSportTypes,
  onSave,
  onDelete,
  addSportTypeLoading,
  deleteSportTypeLoading,
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
          <FormTitle title="Disciplíny sportoviště" />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} md={6}>
          { placeSportTypes?.map((sportType) => (
            <SportTypeChip
              id={sportType.stid}
              text={sportType.sportTypeName}
              onDelete={onDelete}
              loading={deleteSportTypeLoading}
            />
          ))}
          {placeSportTypes.length || <FormTitle title="Žadné disciplíny" />}
        </Grid>
        <Grid item xs={12} md={6}>
          <AddSportTypeForm
            sportTypes={sportTypes}
            placeSportTypes={placeSportTypes}
            reFetchData={reFetchPlaceSportTypes}
            onSave={onSave}
            loading={addSportTypeLoading}
          />
        </Grid>

      </Grid>
    </div>
  );
};

export { SportTypes };
