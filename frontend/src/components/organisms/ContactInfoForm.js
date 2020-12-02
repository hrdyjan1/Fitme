import React from 'react';
import { Box, Button } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { FormikTextField } from 'src/components/atoms/FormikTextField';
import { CardForm } from 'src/components/organisms/CardForm';
import { regex } from 'src/constants/regex';
import { validText } from 'src/constants/validTexts';

function ContactInfoForm({ user, loading, onSave }) {
  const [initialValues, setInitialValues] = React.useState({
    nickname: user.nickname || '',
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    phoneNumber: user.phoneNumber || '',
  });

  const validate = (values) => {
    const errors = {};
    if (!regex.name.test(values.nickname)) errors.nickname = validText.nickname;
    if (!regex.name.test(values.firstName)) errors.firstName = validText.firstName;
    if (!regex.name.test(values.lastName)) errors.lastName = validText.lastName;
    if (!regex.email.test(values.email)) errors.email = validText.email;
    if (!regex.phoneNumber.test(values.phoneNumber)) errors.phoneNumber = validText.phoneNumber;
    return errors;
  };

  const onSubmit = (values) => {
    onSave(values).then(() => {
      setInitialValues(values)
    })
  }

  return (
    <CardForm header="KONTAKTNÍ ÚDAJE">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values) => onSubmit(values)}
        validate={(values) => validate(values)}
      >
        {(formikBag) => (
          <Form>
            <FormikTextField
              name="nickname"
              label="Přezdívka"
              placeholder="Zadejte svou přezdívku"
            />
            <FormikTextField
              name="firstName"
              label="Jméno"
              placeholder="Zadejte své jméno"
            />
            <FormikTextField
              name="lastName"
              label="Příjmení"
              placeholder="Zadejte své příjmení"
            />
            <FormikTextField
              name="email"
              label="E-mail"
              placeholder="Zadejte svůj e-mail"
            />
            <FormikTextField
              name="phoneNumber"
              label="Telefon"
              placeholder="Zadejte své telefonní číslo"
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
                  disabled={loading || (formikBag.values === initialValues)}
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
