import React, { useEffect } from 'react';
import {
  useMediaQuery,
  Grid,
  Divider,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import { ProfilePicture } from 'src/components/molecules';
import { FormTitle } from 'src/components/atoms';

function ProfilePictureForm({
  imageURL, reFetchUser, onSave, loading,
}) {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  useEffect(() => {
    reFetchUser();
  }, []);

  return (
    <>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <FormTitle title="Profilová fotka" />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <ProfilePicture
            imageURL={imageURL}
            onSave={onSave}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
}

export { ProfilePictureForm };
