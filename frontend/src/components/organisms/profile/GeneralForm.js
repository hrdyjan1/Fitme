import React from 'react';
import {
  useMediaQuery,
  Grid,
  Button,
  Typography,
  Divider,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { FormikTextField } from 'src/components/atoms';
import * as yup from 'yup'
import {yupValidation} from '../../../constants/yupValidation'

const useStyles = makeStyles((theme) => ({
  root: {},
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
}));

function GeneralForm ({user, onSave, loading }) {
  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [initialValues, setInitialValues] = React.useState({
    ico: user?.ico || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    description: user?.description || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    street: user?.street || '',
    city: user?.city || '',
    zipCode: user?.zipCode || '',
    country: user?.country || ''
  });

  const validationSchema = yup.object().shape({
    ico: yupValidation.ico,
    email: yupValidation.email,
    phoneNumber: yupValidation.phoneNumber,
    description: yupValidation.description,
    firstName: yupValidation.firstName,
    lastName: yupValidation.lastName,
    street: yupValidation.street,
    city: yupValidation.city,
    zipCode: yupValidation.zipCode,
    country: yupValidation.country
  });

  const onSubmit = (values) => {
    onSave(values).then(() => {
      setInitialValues(values);
    });
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
    <div className={classes.root}>
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >{(formik) => (
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
                  label={prepareLabel('Jméno')}
                  name="firstName"
                  placeholder="Zadejte jméno"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikTextField
                  label={prepareLabel('Příjmení')}
                  name="lastName"
                  placeholder="Zadejte příjmení"
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
                  label={prepareLabel('Ulice a č.p.')}
                  name="street"
                  placeholder="Zadejte ulici a č.p."
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikTextField
                  label={prepareLabel('Město')}
                  name="city"
                  placeholder="Zadejte město"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikTextField
                  label={prepareLabel('PSČ')}
                  name="zipCode"
                  placeholder="Zadejte PSČ"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikTextField
                  label={prepareLabel('Stát')}
                  name="country"
                  placeholder="Zadejte stát"
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
                  disabled={loading || formik.values === initialValues}
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
      </Formik>
    </div>
  );
};

export { GeneralForm };
