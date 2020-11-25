/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Typography } from '@material-ui/core';

import { Image } from 'src/components/atoms/image';
import { SectionHeader } from 'src/components/molecules/sectionHeader';
import { PARTNERS } from './helpers';

const useStyles = makeStyles((theme) => ({
  root: {},
  promoLogo: {
    maxWidth: 80,
    padding: 2,
  },
  price: {
    color: theme.palette.text.primary,
    fontSize: 32,
    fontWeight: 'normal',
    [theme.breakpoints.up('md')]: {
      fontSize: 48,
    },
  },
  disclimer: {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1 / 2, 1),
    background: theme.palette.alternate.main,
    display: 'inline-block',
  },
  image: {
    maxWidth: 600,
  },
}));

function Subtitle() {
  return (
    <Typography color="textSecondary" align="justify">
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean fermentum
      risus id tortor. Sed elit dui, pellentesque a, faucibus vel, interdum nec,
      diam. Aliquam ante. Nulla turpis magna, cursus sit amet, suscipit a,
      interdum id, felis. Pellentesque habitant morbi tristique senectus et
      netus et malesuada fames ac turpis egestas. Integer malesuada. Maecenas
      sollicitudin. Sed elit dui, pellentesque a, faucibus vel, interdum nec,
      diam.
    </Typography>
  );
}

const Hero = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid
        container
        justify="space-between"
        spacing={isMd ? 4 : 2}
        direction={isMd ? 'row' : 'column-reverse'}
      >
        <Grid item xs={12} md={6} data-aos="fade-up">
          <SectionHeader
            title="Vitejte v aplikaci Fit.me, misto urcene pro sport."
            subtitle={<Subtitle />}
            align="left"
            data-aos="fade-up"
            titleVariant="h3"
          />
          <Grid item xs={12}>
            <Typography
              variant="h6"
              color="primary"
              align={isMd ? 'left' : 'center'}
              gutterBottom
            >
              Spolupracujeme s:
            </Typography>
            <Grid container justify="flex-start">
              {PARTNERS.map((partner) => (
                <Grid
                  item
                  container
                  justify="center"
                  xs={6}
                  sm={2}
                  key={partner.id}
                >
                  <Image
                    src={partner.url}
                    alt={partner.alt}
                    className={classes.promoLogo}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <div className={classes.disclimer} data-aos="fade-up" />
        </Grid>
        <Grid item container justify="center" xs={12} md={6} data-aos="fade-up">
          <Image src="/runner.jpg" alt="Runner" className={classes.image} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Hero;
