import React from 'react';
import { Box, Button } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { FormikPasswordField } from 'src/atoms';
import { regex } from 'src/constants/regex';
import { validText } from 'src/constants/validTexts';
import { CardForm } from 'src/organisms';

function ChangePasswordForm({ loading, onSave }) {
  const initialValues = { oldPassword: '', newPassword: '', newPasswordCheck: '' };

  const validate = (values) => {
    const errors = {};
    if (!values.oldPassword) errors.oldPassword = validText.noPassword;
    if (!regex.password.test(values.newPassword)) errors.newPassword = validText.password;
    if (values.newPassword !== values.newPasswordCheck) errors.newPasswordCheck = validText.passwordCheck;
    return errors;
  };

  return (
    <CardForm header="ZMĚNIT HESLO">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values) => onSave(values)}
        validate={(values) => validate(values)}
      >
        {(formikBag) => (
          <Form>
            <FormikPasswordField
              name="oldPassword"
              label="Staré heslo"
              placeholder="Zadejte vaše aktuální heslo"
              formikBag={formikBag}
              validText={formikBag.errors.oldPassword}
            />
            <FormikPasswordField
              name="newPassword"
              label="Nové heslo"
              placeholder="Zadejte město"
              formikBag={formikBag}
              validText={formikBag.errors.newPassword}
            />
            <FormikPasswordField
              name="newPasswordCheck"
              label="Potvrzení nového hesla"
              placeholder="Zadejte nové heslo znovu"
              formikBag={formikBag}
              validText={formikBag.errors.newPasswordCheck}
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
                  disabled={loading || Object.values(formikBag.values).some((value) => !value)}
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
