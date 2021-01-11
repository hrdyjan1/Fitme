import React from 'react';
import { Box, Button } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { FormikPasswordField } from 'src/components/atoms';
import { CardForm } from 'src/components/organisms';
import * as yup from 'yup';
import { yupValidation } from 'src/constants/yupValidation';

function ChangePasswordForm({ loading, onSave }) {
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    newPasswordCheck: '',
  };

  const validationSchema = yup.object().shape({
    oldPassword: yupValidation.required,
    newPassword: yupValidation.password,
    newPasswordCheck: yupValidation.passwordCheck('newPassword'),
  });

  return (
    <CardForm header="ZMĚNIT HESLO">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => onSave(values)}
      >
        {(formikBag) => (
          <Form>
            <FormikPasswordField
              name="oldPassword"
              label="Staré heslo"
              placeholder="Zadejte vaše aktuální heslo"
            />
            <FormikPasswordField
              name="newPassword"
              label="Nové heslo"
              placeholder="Zadejte nové heslo"
            />
            <FormikPasswordField
              name="newPasswordCheck"
              label="Potvrzení nového hesla"
              placeholder="Zadejte nové heslo znovu"
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
                    loading
                    || Object.values(formikBag.values).some((value) => !value)
                  }
                >
                  Uložit
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </CardForm>
  );
}

export { ChangePasswordForm };
