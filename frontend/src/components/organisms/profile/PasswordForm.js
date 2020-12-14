import React from 'react';
import {
  useMediaQuery,
  Grid,
  Button,
  Typography,
  Divider, TextField
} from '@material-ui/core'
import { Form, Formik } from 'formik';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import {FormikPasswordField, FormikTextField} from 'src/components/atoms'
import * as yup from 'yup'
import {yupValidation} from '../../../constants/yupValidation'

const useStyles = makeStyles((theme) => ({
  root: {},
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
}));

function PasswordForm ({ onSave, loading }) {
  const classes = useStyles();
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
    <div className={classes.root}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >{(formik) => (
        <Form>
          <Grid container spacing={isMd ? 4 : 2}>
            <Grid item xs={12}>
              <Typography variant="h6" color="textPrimary">
                Změna hesla
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                color="textPrimary"
                className={classes.inputTitle}
              >
                Aktuální heslo
              </Typography>
              <FormikPasswordField name="oldPassword" placeholder="Zadejte aktuální heslo"/>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                color="textPrimary"
                className={classes.inputTitle}
              >
                Nové heslo
              </Typography>
              <FormikPasswordField name="newPassword" placeholder="Zadejte nové heslo"/>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                color="textPrimary"
                className={classes.inputTitle}
              >
                Potvrzení nového hesla
              </Typography>
              <FormikPasswordField name="newPasswordCheck" placeholder="Zadejte nové heslo znovu"/>
            </Grid>
            <Grid item container justify="center" xs={12}>
              <Button
                disabled={loading || Object.values(formik.values).some((value) => !value)}
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

export { PasswordForm };
