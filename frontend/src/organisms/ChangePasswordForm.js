import React from 'react';
import { Box, Button } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { FormikPasswordField } from 'src/atoms';
import { regex } from 'src/constants/regex';
import { validText } from 'src/constants/validTexts';
import { CardForm } from 'src/organisms/CardForm';

function ChangePasswordForm({ loading, onSave }) {
  const validate = (values) => ({
    oldPassword: values.oldPassword.length < 5 && validText.oldPassword,
    newPassword: !regex.password.test(values.newPassword) && validText.password,
    newPasswordCheck:
      values.newPassword !== values.newPasswordCheck && validText.passwordCheck,
  });
  const onSaveClick = (values, errors) => {
    if (
      !Object.values(errors).some((e) => !!e)
      && Object.values(values).every((v) => !!v)
    ) {
      onSave(values);
    }
  };

  return (
    <CardForm header="ZMĚNIT HESLO">
      <Formik
        enableReinitialize
        initialValues={{
          oldPassword: '',
          newPassword: '',
          newPasswordCheck: '',
        }}
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
            />
            <FormikPasswordField
              name="newPassword"
              label="Nové heslo"
              placeholder="Zadejte město"
              formikBag={formikBag}
            />
            <FormikPasswordField
              name="newPasswordCheck"
              label="Potvrzení nového hesla"
              placeholder="Zadejte nové heslo znovu"
              formikBag={formikBag}
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
                  onClick={() => onSaveClick(formikBag.values, formikBag.errors)}
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
