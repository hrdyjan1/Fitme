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
import { useUser } from '../../../contexts/user';

const USER_TYPE_ATHLETE = 'athlete';
const USER_TYPE_PLACE_OWNER = 'place';
const USER_TYPE_TRAINER = 'trainer';

function GeneralForm({
  data, reFetchData, onSave, loading,
}) {
  const { user } = useUser();
  const theme = useTheme();
  const isUserPlaceOwner = user.type === USER_TYPE_PLACE_OWNER;
  const isUserTrainer = user.type === USER_TYPE_TRAINER;
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [initialValues, setInitialValues] = React.useState({
    ico: data?.ico || '',
    email: data?.email || '',
    phoneNumber: data?.phoneNumber || '',
    description: data?.description || '',
    name: data?.name || '',
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
    street: data?.street || '',
    city: data?.city || '',
    zipCode: data?.zipCode || '',
    country: data?.country || '',
  });

  useEffect(() => {
    reFetchData();
  }, []);

  const athleteValidationSchema = {
    firstName: yupValidation.firstName,
    lastName: yupValidation.lastName,
    email: yupValidation.email,
    phoneNumber: yupValidation.phoneNumber,
    street: yupValidation.street,
    city: yupValidation.city,
    zipCode: yupValidation.zipCode,
    country: yupValidation.country,
  };

  const trainerValidationSchema = {
    ...athleteValidationSchema,
    ico: yupValidation.ico,
    description: yupValidation.description,
  };

  const placeOwnerValidationSchema = {
    ...trainerValidationSchema,
    name: yupValidation.name,
  };

  const validationSchema = () => {
    switch (user.type) {
      case USER_TYPE_ATHLETE: return yup.object().shape(athleteValidationSchema);
      case USER_TYPE_PLACE_OWNER: return yup.object().shape(placeOwnerValidationSchema);
      case USER_TYPE_TRAINER: return yup.object().shape(trainerValidationSchema);
    }
  };

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
              {isUserPlaceOwner && (
                <Grid item xs={12} sm={6}>
                  <FormikTextField
                    label="Název organizace"
                    name="name"
                    placeholder="Zadejte název"
                  />
                </Grid>
              )}
              {(isUserPlaceOwner || isUserTrainer) && (
                <Grid item xs={12} sm={6}>
                  <FormikTextField
                    label="IČO"
                    name="ico"
                    placeholder="Zadejte ičo"
                  />
                </Grid>
              )}
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
              {(isUserPlaceOwner || isUserTrainer) && (
                <Grid item xs={12}>
                  <FormikTextField
                    label="Popis"
                    name="description"
                    placeholder="Zadejte popis"
                  />
                </Grid>
              )}
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
