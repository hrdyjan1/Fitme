import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';

import {
  compose,
  match,
  stringAfterEqual,
} from 'src/constants/functions/basic';
import { route } from 'src/constants/routes';
import { useNotification } from 'src/contexts/notification';
import Section from 'src/components/organisms/Section';
import * as yup from 'yup';
import { yupValidation } from '../constants/yupValidation';

const CHANGE_PASSWORD = gql`
  mutation changeForgotPass($lockedToken: String!, $password: String!) {
    changeForgotPass(lockedToken: $lockedToken, password: $password)
  }
`;

const useStyles = makeStyles((theme) => ({
  pagePaddingTop: {
    paddingTop: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(5),
    },
    paddingBottom: theme.spacing(1),
  },
}));

const initialFormValues = { newPassword: '', newPasswordCheck: '' };

const validationSchema = yup.object().shape({
  newPassword: yupValidation.password,
  newPasswordCheck: yupValidation.passwordCheck('newPassword'),
});

const pickUpLockToken = compose(stringAfterEqual, match(/\/lockedToken=(.+)/));

function ResetPassword({ token }) {
  const classes = useStyles();
  const history = useHistory();
  const { showMessage, showErrorMessage } = useNotification();
  const [resetPassword, { loading }] = useMutation(CHANGE_PASSWORD);

  const goHomePage = () => history.push(route.home());

  const onSubmit = ({ password }) => {
    resetPassword({ variables: { lockedToken: token, password } })
      .then((r) => {
        if (r.data) {
          showMessage('Zmena hesla probehla uspesne');
          goHomePage();
        }
        if (r.errors) {
          showErrorMessage(String(r.errors));
        }
      })
      .catch((e) => showErrorMessage(String(e).message));
  };

  return (
    <div>
      <Section className={classes.pagePaddingTop}>
        <Box marginBottom={4}>
          <Typography variant="h4" color="main" align="center">
            Poslední krok
          </Typography>
        </Box>
        <Typography variant="h5" color="main" align="center">
          Pro změnu hesla použijte následující formulář
        </Typography>
        <Box
          marginTop="20px"
          width="100%"
          display="flex"
          flexDirection="column"
          flexWrap="wrap"
          alignItems="center"
        >
          <Box marginTop="10px" width="70%" maxWidth="500px">
            <Formik
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              initialValues={initialFormValues}
              render={(formikBag) => (
                <Form>
                  <Field
                    validateOnBlur
                    validateOnChange
                    name="newPassword"
                    render={({ form }) => (
                      <TextField
                        id="newPassword"
                        name="newPassword"
                        type="newPassword"
                        placeholder="Zadejte nove heslo"
                        label="Heslo"
                        onChange={formikBag.handleChange}
                        error={Boolean(
                          form.errors.newPassword && form.touched.newPassword
                        )}
                        onBlur={formikBag.handleBlur}
                        helperText={
                          form.errors.newPassword &&
                          form.touched.newPassword &&
                          String(form.errors.newPassword)
                        }
                        variant="filled"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                  <Field
                    validateOnBlur
                    validateOnChange
                    name="newPasswordCheck"
                    render={({ form }) => (
                      <TextField
                        id="newPasswordCheck"
                        type="newPasswordCheck"
                        name="newPasswordCheck"
                        placeholder="Zadejte znova heslo"
                        label="Heslo znova"
                        onChange={formikBag.handleChange}
                        error={Boolean(
                          form.errors.newPasswordCheck &&
                            form.touched.newPasswordCheck
                        )}
                        onBlur={formikBag.handleBlur}
                        helperText={
                          form.errors.newPasswordCheck &&
                          form.touched.newPasswordCheck &&
                          String(form.errors.newPasswordCheck)
                        }
                        variant="filled"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                  <Box
                    marginTop="20px"
                    marginBottom="30px"
                    width="100%"
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    justifyContent="center"
                  >
                    <Box width="97%">
                      <Button
                        type="submit"
                        size="large"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={
                          loading || !formikBag.isValid || !formikBag.dirty
                        }
                      >
                        Odeslat
                      </Button>
                    </Box>
                  </Box>
                </Form>
              )}
            />
          </Box>
        </Box>
      </Section>
    </div>
  );
}

export { ResetPassword, pickUpLockToken };
