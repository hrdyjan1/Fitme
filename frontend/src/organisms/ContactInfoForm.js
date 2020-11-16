import React from 'react';
import { Box, Button } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { FormikTextField } from 'src/atoms/FormikTextField';
import { CardForm } from 'src/organisms';
import { regex } from 'src/constants/regex';
import { validText } from 'src/constants/validTexts';

function ContactInfoForm({ user, loading, onSave }) {
  const validate = (values) => ({
    nickname: !regex.name.test(values.nickname) && validText.nickname,
    firstName: !regex.name.test(values.firstName) && validText.firstName,
    lastName: !regex.name.test(values.lastName) && validText.lastName,
    email: !regex.email.test(values.email) && validText.email,
    phoneNumber: !regex.phoneNumber.test(values.phoneNumber) && validText.phoneNumber,
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
    <CardForm header="KONTAKTNÍ ÚDAJE">
      <Formik
        enableReinitialize
        initialValues={{
          nickname: user.nickname,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
        }}
        onSubmit={(values) => onSave(values)}
        validate={(values) => validate(values)}
      >
        {(formikBag) => (
          <Form>
            <FormikTextField
              name="nickname"
              label="přezdívka"
              placeholder="Zadejte svou přezdívku"
              formikBag={formikBag}
            />
            <FormikTextField
              name="firstName"
              label="Jméno"
              placeholder="Zadejte své jméno"
              formikBag={formikBag}
            />
            <FormikTextField
              name="lastName"
              label="Příjmení"
              placeholder="Zadejte své příjmení"
              formikBag={formikBag}
            />
            <FormikTextField
              name="email"
              label="E-mail"
              placeholder="Zadejte svůj e-mail"
              formikBag={formikBag}
            />
            <FormikTextField
              name="phoneNumber"
              label="Telefon"
              placeholder="Zadejte své telefonní číslo"
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

export { ContactInfoForm };
