import React from 'react';
import * as yup from 'yup';
import { yupValidation } from 'src/constants/yupValidation';
import { Form, Formik } from 'formik';
import { Box, Button } from '@material-ui/core';
import { FormikPasswordField, FormikTextField } from 'src/components/atoms';

function SignInForm({ onSave, loading }) {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    email: yupValidation.email,
    password: yupValidation.required,
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => onSave(values)}
      render={() => (
        <Form>
          <FormikTextField
            name="email"
            label="E-mail"
            placeholder="Zadejte svůj e-mail"
          />
          <FormikPasswordField
            name="password"
            label="Heslo"
            placeholder="Zadeje své heslo"
          />
          <Box
            marginTop="30px"
            marginBottom="30px"
            width="100%"
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
          >
            <Box width="200px">
              <Button
                type="submit"
                size="large"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
              >
                Přihlásit
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    />
  );
}

export { SignInForm };
