import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid } from '@material-ui/core';
import { Image } from 'src/components/atoms/image';
import { SectionHeader } from 'src/components/molecules/profile/SectionHeader';

const useStyles = makeStyles(() => ({
  root: {},
  image: {
    maxWidth: 420,
    maxHeight: 420,
  },
}));

const Story = (props) => {
  const {
    className, description, imageURL,
  } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={clsx(classes.root, className)}>
      <Grid
        container
        justify="space-between"
        spacing={isMd ? 4 : 2}
        direction={isMd ? 'row' : 'column-reverse'}
      >
        <Grid
          item
          container
          alignItems="center"
          justify="flex-start"
          xs={12}
          md={6}
          data-aos="fade-up"
        >
          <div>
            <SectionHeader
              title="Popis"
              subtitle={description}
              align="left"
              disableGutter
              subtitleProps={{
                color: 'textPrimary',
                variant: 'body1',
              }}
            />
          </div>
        </Grid>
        <Grid
          item
          container
          justify={isMd ? 'flex-end' : 'flex-start'}
          alignItems="center"
          xs={12}
          md={6}
          data-aos="fade-up"
        >
          {imageURL && (
          <Image
            src={imageURL}
            alt="Our story"
            className={classes.image}
          />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export { Story };
