/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import clsx from 'clsx';
import {
  useMediaQuery,
  Grid,
  Button,
  Typography,
  Divider,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import { gql, useMutation } from '@apollo/client';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { FormikTextField } from 'src/components/atoms';
import { useUser } from 'src/contexts/user';
import { useNotification } from 'src/contexts/notification';

const UPDATE_PLACE_BASICS = gql`
    mutation UpdatePlace($placeBasics: PlaceBasics!) {
        updatePlaceBasics(placeBasics: $placeBasics)
    }
`;

const useStyles = makeStyles((theme) => ({
  root: {},
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
}));

const General = (props) => {
  const { className, place, ...rest } = props;
  const { user } = useUser();
  const classes = useStyles();
  const { showMessage, showErrorMessage } = useNotification();
  const [updatePlaceBasics] = useMutation(UPDATE_PLACE_BASICS);

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [initialValues, setInitialValues] = React.useState({
    ico: place.ico || '',
    city: place.city || '',
    name: place.name || '',
    email: place.email || '',
    street: place.street || '',
    latitude: place.latitude || '',
    longitude: place.longitude || '',
    description: place.description || '',
    phoneNumber: place.phoneNumber || '',
  });

  const onSubmit = (values) => {
    updatePlaceBasics({ variables: { placeBasics: { ...values, id: place.id, uid: user.id } } })
      .then(() => {
        setInitialValues(values);
        showMessage('Změna proběhla úspěšně.');
      }).catch(() => showErrorMessage('Během změny nastala chyba.'));
  };

  const prepareLabel = (label) => (
    <Typography
      variant="subtitle1"
      color="textPrimary"
      className={classes.inputTitle}
    >
      {label}
    </Typography>
  );

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={() => (
          <Form>
            <Grid container spacing={isMd ? 4 : 2}>
              <Grid item xs={12}>
                <Typography variant="h6" color="textPrimary">
                  Základní informace
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormikTextField
                  label={prepareLabel('Název')}
                  name="name"
                  placeholder="Zadejte název"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikTextField
                  label={prepareLabel('IČO')}
                  name="ico"
                  placeholder="Zadejte ičo"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikTextField
                  label={prepareLabel('Ulice')}
                  name="street"
                  placeholder="Zadejte ulici"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikTextField
                  label={prepareLabel('Město')}
                  name="city"
                  placeholder="Zadejte město"
                />
              </Grid>
              <Grid item xs={12}>
                <FormikTextField
                  label={prepareLabel('Popis')}
                  name="description"
                  placeholder="Zadejte popis"
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikTextField
                  label={prepareLabel('Zeměpisná šířka')}
                  name="latitude"
                  placeholder="50.1332"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikTextField
                  label={prepareLabel('Zeměpisná délka')}
                  name="longitude"
                  placeholder="14.538"
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikTextField
                  label={prepareLabel('Email')}
                  name="email"
                  placeholder="Zadejte email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikTextField
                  label={prepareLabel('Telefon')}
                  name="phoneNumber"
                  placeholder="Zadejte telefon"
                />
              </Grid>
              <Grid item container justify="center" xs={12}>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  size="large"
                >
                  Uložit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      />
    </div>
  );
};

export default General;
