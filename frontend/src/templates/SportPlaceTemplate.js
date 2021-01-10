/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  colors,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { Image } from 'src/components/atoms/image';
import { SectionHeader } from 'src/components/molecules/profile/SectionHeader';
import { Search } from 'src/components/organisms';
import { route } from 'src/constants/routes';
import { useHistory } from 'react-router-dom';
import { truncate } from 'src/constants/string';

const useStyles = makeStyles((theme) => ({
  root: {},
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: theme.palette.primary,
    position: 'absolute',
    top: '55%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  card: {
    boxShadow: '0 9px 18px 0 rgba(0, 0, 0, 0.1)',
    borderRadius: theme.spacing(2),
    '&:hover': {
      boxShadow: '0 9px 18px 0 rgba(0, 0, 0, 0.5)',
    },
    cursor: 'pointer',
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
  priceCta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchButton: {
    maxHeight: 45,
    minWidth: 135,
    [theme.breakpoints.down('sm')]: {
      minWidth: 'auto',
    },
  },
}));

function SportPlaceTemplate(props) {
  const {
    isMd,
    rating,
    places,
    loading,
    showAll,
    className,
    maxPlaceToSee,
    goToSportPlaces,
    onCategoryChange,
    categoriesOptions,
    handleFilterClick,
    onSearchValueChange,
    ...rest
  } = props;

  const classes = useStyles();
  const history = useHistory();
  const onClick = (id) => history.push(route.sportPlaceDetail(id));

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <SectionHeader
        title="Sportoviště"
        subtitle="Zde je seznam sportovišť, které doporučujeme."
        titleVariant="h4"
      />
      <Search
        options={categoriesOptions}
        placeholder="Vybrat kategorii"
        label="Kategorie"
        onInputChange={onCategoryChange}
      />
      <Search
        options={[]}
        placeholder="Vyhledat podle názvu"
        label="Hledání"
        freeSolo
        onInputChange={onSearchValueChange}
      />

      <div className={classes.wrapper}>
        <Button
          color="primary"
          variant="contained"
          size="large"
          disabled={loading}
          onClick={handleFilterClick}
          className={classes.searchButton}
        >
          Filtrovat
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>

      {places && (
        <Grid container spacing={isMd ? 4 : 2} style={{ marginTop: 20 }}>
          {places.slice(0, maxPlaceToSee).map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id} data-aos="fade-up">
              <Card className={classes.card} onClick={() => onClick(item.id)}>
                <CardMedia className={classes.cardMedia}>
                  <Image
                    src={
                      item.imageURL ||
                      'https://i.ytimg.com/vi/w-oHc3Fk9Xo/maxresdefault.jpg'
                    }
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
                      {truncate(item.description, 120)}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {!showAll && (
            <Grid item xs={12} container justify="center" data-aos="fade-up">
              <Button
                variant="outlined"
                color="primary"
                onClick={goToSportPlaces}
              >
                Všechny sportoviště
              </Button>
            </Grid>
          )}
        </Grid>
      )}
    </div>
  );
}

export { SportPlaceTemplate };
