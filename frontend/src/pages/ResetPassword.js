import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { Box, Button, TextField } from '@material-ui/core';

import {
  compose,
  match,
  stringAfterEqual,
} from 'src/constants/functions/basic';
import { route } from 'src/constants/routes';
import { regex } from 'src/constants/regex';
import { useNotification } from 'src/contexts/notification';

const CHANGE_PASSWORD = gql`
  mutation changeForgotPass($lockedToken: String!, $password: String!) {
    changeForgotPass(lockedToken: $lockedToken, password: $password)
  }
`;

const initialFormValues = { password: '', re_password: '' };

const validate = (values) => {
  const errors = {};
  if (values.password.length < 8) {
    errors.password = 'Heslo musi mit minimalne 8 znaku';
  } else if (!regex.password.test(values.password)) {
    errors.password = 'Heslo musi obsahovat minimalne 1 velke pismeno, 1 male pismeno, 1 cislici,';
  }

  if (values.password !== values.re_password) {
    errors.re_password = 'Hesla se neshoduji';
  }
  return errors;
};

const pickUpLockToken = compose(stringAfterEqual, match(/\/lockedToken=(.+)/));

function ResetPassword({ token }) {
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
      <Box
        marginTop="20px"
        width="100%"
        display="flex"
        flexDirection="column"
        flexWrap="wrap"
        alignItems="center"
      >
        <Box marginTop="50px" width="70%" maxWidth="500px">
          <Formik
            onSubmit={onSubmit}
            validate={validate}
            initialValues={initialFormValues}
            render={(formikBag) => (
              <Form>
                <Field
                  validateOnBlur
                  validateOnChange
                  name="password"
                  render={({ form }) => (
                    <TextField
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Zadejte nove heslo"
                      label="Heslo"
                      onChange={formikBag.handleChange}
                      error={Boolean(
                        form.errors.password && form.touched.password,
                      )}
                      onBlur={formikBag.handleBlur}
                      helperText={
                        form.errors.password
                        && form.touched.password
                        && String(form.errors.password)
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
                  name="re_password"
                  render={({ form }) => (
                    <TextField
                      id="re_password"
                      type="password"
                      name="re_password"
                      placeholder="Zadejte znova heslo"
                      label="Heslo znova"
                      onChange={formikBag.handleChange}
                      error={Boolean(
                        form.errors.re_password && form.touched.re_password,
                      )}
                      onBlur={formikBag.handleBlur}
                      helperText={
                        form.errors.re_password
                        && form.touched.re_password
                        && String(form.errors.re_password)
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
    </div>
  );
}

export { ResetPassword, pickUpLockToken };
