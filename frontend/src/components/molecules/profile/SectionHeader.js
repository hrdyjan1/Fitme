/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Grid, Typography } from '@material-ui/core';

const SectionHeader = (props) => {
  const {
    title,
    subtitle,
    titleProps,
    subtitleProps,
  } = props;

  return (
    <Grid
      container
      spacing={2}
    >
      <Grid item xs={12}>
        <Typography
          variant="h3"
          align="left"
          color="textPrimary"
          {...titleProps}
        >
          {title}
        </Typography>
      </Grid>
      {subtitle && (
        <Grid item xs={12}>
          <Typography
            variant="h6"
            align="left"
            color="textSecondary"
            {...subtitleProps}
          >
            {subtitle}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export { SectionHeader };
