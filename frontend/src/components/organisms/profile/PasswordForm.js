import React from 'react';
import {
  useMediaQuery,
  Grid,
  Divider,
} from '@material-ui/core'
import { Form, Formik } from 'formik';
import { useTheme } from '@material-ui/core/styles';

import { FormButton, FormikPasswordField, FormTitle } from 'src/components/atoms'
import * as yup from 'yup'
import { yupValidation } from '../../../constants/yupValidation'

function PasswordForm ({ onSave, loading }) {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const initialValues = { oldPassword: '', newPassword: '', newPasswordCheck: '' };

  const validationSchema = yup.object().shape({
    oldPassword: yupValidation.required,
    newPassword: yupValidation.password,
    newPasswordCheck: yupValidation.passwordCheck('newPassword'),
  });

  const onSubmit = async (values, { resetForm }) => {
    onSave(values).then(() => {
      resetForm();
    });
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >{(formik) => (
        <Form>
          <Grid container spacing={isMd ? 4 : 2}>
            <Grid item xs={12}>
              <FormTitle title="Změna hesla"/>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <FormikPasswordField
                label="Aktuální heslo"
                name="oldPassword"
                placeholder="Zadejte aktuální heslo"
              />
            </Grid>
            <Grid item xs={12}>
              <FormikPasswordField
                label="Nové heslo"
                name="newPassword"
                placeholder="Zadejte nové heslo"
              />
            </Grid>
            <Grid item xs={12}>
              <FormikPasswordField
                label="Potvrzení nového hesla"
                name="newPasswordCheck"
                placeholder="Zadejte nové heslo znovu"
              />
            </Grid>
            <Grid item container justify="center" xs={12}>
              <FormButton
                text="Uložit"
                disabled={loading || Object.values(formik.values).some((value) => !value)}
              />
            </Grid>
          </Grid>
        </Form>
      )}
      </Formik>
    </>
  );
};

export { PasswordForm };
