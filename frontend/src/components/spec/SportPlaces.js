/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  colors,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from '@material-ui/core';
import { Image } from 'src/components/atoms/image';
import { SectionHeader } from 'src/components/molecules/sectionHeader';
import { useHistory } from 'react-router-dom';
import { route } from 'src/constants/routes';

const useStyles = makeStyles((theme) => ({
  root: {},
  card: {
    boxShadow: '0 9px 18px 0 rgba(0, 0, 0, 0.1)',
    borderRadius: theme.spacing(2),
  },
  cardMedia: {
    height: 290,
    position: 'relative',
    background: colors.indigo[50],
  },
  cardContent: {
    padding: theme.spacing(3),
  },
  image: {
    objectFit: 'cover',
  },
  fontWeightBold: {
    fontWeight: 'bold',
  },
  hearIconContainer: {
    position: 'absolute',
    top: theme.spacing(3),
    right: theme.spacing(3),
  },
  ratingContainer: {
    margin: theme.spacing(2, 0),
  },
  ratingIcon: {
    color: colors.yellow[700],
    marginRight: theme.spacing(1 / 2),
  },
  priceCta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const SportPlaces = ({
  data, className, showAll, ...rest
}) => {
  const classes = useStyles();
  const history = useHistory();
  const goToSportPlaces = () => history.push(route.sportPlaces());
  const maxPlaceToSee = showAll ? data.length : 6;

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const rating = (count) => {
    const ratingArray = [];
    for (let i = 1; i <= 5; i += 1) {
      ratingArray.push(
        <i
          className={clsx(
            i <= count ? 'fas fa-star' : 'far fa-star',
            classes.ratingIcon,
          )}
          key={i}
        />,
      );
    }

    return ratingArray;
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <SectionHeader
        title="Sportoviste"
        subtitle="Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
        titleVariant="h4"
      />
      <Grid container spacing={isMd ? 4 : 2}>
        {data.slice(0, maxPlaceToSee).map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id} data-aos="fade-up">
            <Card className={classes.card}>
              <CardMedia className={classes.cardMedia}>
                <Image
                  src="https://i.ytimg.com/vi/w-oHc3Fk9Xo/maxresdefault.jpg"
                  alt={item.name}
                  className={classes.image}
                />
              </CardMedia>
              <CardContent className={classes.cardContent}>
                <Typography
                  color="textPrimary"
                  variant="h6"
                  className={classes.fontWeightBold}
                >
                  {item.name}
                </Typography>
                <div className={classes.ratingContainer}>{rating(3)}</div>
                <div className={classes.priceCta}>
                  <Typography variant="subtitle1">
                    {item.description}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {!showAll && (
          <Grid item xs={12} container justify="center" data-aos="fade-up">
            <Button variant="outlined" color="primary" onClick={goToSportPlaces}>
              Vsechny sportoviste
            </Button>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default SportPlaces;
