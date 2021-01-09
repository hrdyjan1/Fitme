import React, { useEffect } from 'react';
import {
  useMediaQuery,
  Grid,
  Divider,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import { useTheme } from '@material-ui/core/styles';

import { FormikTextField, FormTitle, FormButton } from 'src/components/atoms';
import * as yup from 'yup';
import { yupValidation } from 'src/constants/yupValidation';

function GeneralForm({
  user, reFetchUser, onSave, loading,
}) {
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
    country: user?.country || '',
  });

  useEffect(() => {
    reFetchUser();
  }, []);

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
    country: yupValidation.country,
  });

  const onSubmit = (values) => {
    onSave(values).then(() => {
      setInitialValues(values);
    });
  };

  return (
    <>
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <Grid container spacing={isMd ? 4 : 2}>
              <Grid item xs={12}>
                <FormTitle title="Základní informace" />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormikTextField
                  label="Jméno"
                  name="firstName"
                  placeholder="Zadejte jméno"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikTextField
                  label="Příjmení"
                  name="lastName"
                  placeholder="Zadejte příjmení"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikTextField
                  label="IČO"
                  name="ico"
                  placeholder="Zadejte ičo"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikTextField
                  label="Ulice a č.p."
                  name="street"
                  placeholder="Zadejte ulici a č.p."
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikTextField
                  label="Město"
                  name="city"
                  placeholder="Zadejte město"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikTextField
                  label="PSČ"
                  name="zipCode"
                  placeholder="Zadejte PSČ"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikTextField
                  label="Stát"
                  name="country"
                  placeholder="Zadejte stát"
                />
              </Grid>
              <Grid item xs={12}>
                <FormikTextField
                  label="Popis"
                  name="description"
                  placeholder="Zadejte popis"
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikTextField
                  label="Email"
                  name="email"
                  placeholder="Zadejte email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikTextField
                  label="Telefon"
                  name="phoneNumber"
                  placeholder="Zadejte telefon"
                />
              </Grid>
              <Grid item container justify="center" xs={12}>
                <FormButton
                  text="Uložit"
                  disabled={loading || formik.values === initialValues}
                />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
}

export { GeneralForm };
