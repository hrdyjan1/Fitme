import React from 'react';
import { Form, Formik } from 'formik'
import { FormikPasswordField, FormikTextField } from '../atoms'
import { UserTypesRadioButtons } from 'src/components/molecules'
import { regex } from 'src/constants/regex'
import { validText } from 'src/constants/validTexts'
import {Box, Button} from '@material-ui/core'

function SignUpForm({onSave, loading}) {
  const initialValues = {
    userType: 'athlete',
    firstName: '',
    lastName: '',
    organization: '',
    ico: '',
    email: '',
    password: '',
    passwordCheck: ''
  };

  const validate = (values) => {
    const errors = {};
    if (!regex.name.test(values.firstName)) {
      errors.firstName = validText.firstName
    }
    if (!regex.name.test(values.lastName)) {
      errors.lastName = validText.lastName
    }
    if (values.userType === 'place') {
      if (!regex.organization.test(values.organization)) {
        errors.organization = validText.organization
      }
      if (!regex.ico.test(values.ico)) {
        errors.ico = validText.ico
      }
    } else {
      delete errors.organization
      delete errors.ico
    }
    if (!regex.email.test(values.email)) {
      errors.email = validText.email
    }
    if (!regex.password.test(values.password)) {
      errors.password = validText.password
    }
    if (values.passwordCheck !== values.password) {
      errors.passwordCheck = validText.passwordCheck;
    }
    return errors;
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values) => onSave(values)}
      validate={(values) => validate(values)}
    >
      {(formik) => (
        <Form>
          <UserTypesRadioButtons name="userType" />
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
          { formik.values.userType === 'place' && (
            <>
              <FormikTextField
                name="organization"
                label="Název organizace"
                placeholder="Zadejte název organizace"
              />
              <FormikTextField
              name="ico"
              label="IČO"
              placeholder="Zadejte IČO"
              />
            </>
          )}
          <FormikTextField
            name="email"
            label="Email"
            placeholder="Zadejte svůj email"
          />
          <FormikPasswordField
            name="password"
            label="Heslo"
            placeholder="Zadejte své heslo"
          />
          <FormikPasswordField
            name="passwordCheck"
            label="Potvrzení hesla"
            placeholder="Zadejte heslo znovu"
          />
          <Box
            marginTop="30px"
            marginBottom="20px"
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
                Registrovat
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export { SignUpForm };
