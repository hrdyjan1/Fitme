import React, {useEffect} from 'react'
import {
  useMediaQuery,
  Grid,
  Typography,
  Divider,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { ProfilePicture } from 'src/components/molecules'

const useStyles = makeStyles((theme) => ({
  root: {},
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
}));

function ProfilePictureForm ({imageURL, reFetchUser, onSave, loading }) {
  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  useEffect(() => {
    reFetchUser();
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <Typography variant="h6" color="textPrimary">
            Profilová fotka
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <ProfilePicture imageURL={imageURL} onSave={onSave} loading={loading} />
        </Grid>
      </Grid>
    </div>
  );
};

export { ProfilePictureForm };
