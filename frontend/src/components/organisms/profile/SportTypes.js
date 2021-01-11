/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Divider } from '@material-ui/core';
import { FormTitle, SportTypeChip } from 'src/components/atoms';
import { AddSportTypeForm } from 'src/components/organisms';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
  chip: {
    margin: '3px'
  },
}));

const SportTypes = ({
  sportTypes,
  savedSportTypes,
  reFetchSavedSportTypes,
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

  const onDeleteSportType = (id) => {
    onDelete(id).then(() => {
      reFetchSavedSportTypes();
    });
  };

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
          {savedSportTypes?.map((sportType) => (
            <SportTypeChip
              key={sportType.stid}
              text={sportType.sportTypeName}
              onDelete={() => onDeleteSportType(sportType.stid)}
              loading={deleteSportTypeLoading}
              className={classes.chip}
            />
          ))}
          {!savedSportTypes.length && <FormTitle title="Žadné disciplíny" />}
        </Grid>
        <Grid item container justify="center" xs={12} md={6}>
          <AddSportTypeForm
            sportTypes={sportTypes}
            placeSportTypes={savedSportTypes}
            reFetchData={reFetchSavedSportTypes}
            onSave={onSave}
            loading={addSportTypeLoading}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export { SportTypes };
