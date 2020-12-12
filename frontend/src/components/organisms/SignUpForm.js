import React from 'react';
import * as yup from 'yup';
import { yupValidation } from 'src/constants/yupValidation'
import { Form, Formik } from 'formik'
import { FormikPasswordField, FormikTextField } from '../atoms'
import { UserTypesRadioButtons } from 'src/components/molecules'
import { Box, Button } from '@material-ui/core'

function SignUpForm({onSave, loading}) {
  const USER_TYPE_PLACE_OWNER = 'place'
  const USER_TYPE_TRAINER = 'trainer'
  const initialValues = {
    userType: 'athlete',
    firstName: '',
    lastName: '',
    organization: '',
    ico: '',
    email: '',
    password: '',
    passwordCheck: '',
  };

  const isUserPlaceOwner = (user) => user === USER_TYPE_PLACE_OWNER
  const isUserTrainer = (user) => user === USER_TYPE_TRAINER

  const validationSchema = yup.object().shape({
    userType: yup.string(),
    firstName: yupValidation.firstName,
    lastName: yupValidation.lastName,
    organization: yup.string().when('userType', { is: USER_TYPE_PLACE_OWNER, then: yupValidation.organization }),
    ico: yup.string()
      .when('userType', { is: USER_TYPE_PLACE_OWNER, then: yupValidation.ico })
      .when('userType', { is: USER_TYPE_TRAINER, then: yupValidation.ico }),
    email: yupValidation.email,
    password: yupValidation.password,
    passwordCheck: yupValidation.passwordCheck('password')
  });

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => onSave(values)}
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
          { isUserPlaceOwner(formik.values.userType) && (
            <FormikTextField
              name="organization"
              label="Název organizace"
              placeholder="Zadejte název organizace"
            />
          )}
          {(isUserPlaceOwner(formik.values.userType) || isUserTrainer(formik.values.userType)) && (
            <FormikTextField
              name="ico"
              label="IČO"
              placeholder="Zadejte IČO"
            />
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
