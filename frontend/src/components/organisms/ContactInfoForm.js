import React from 'react';
import { Box, Button } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { FormikTextField } from 'src/components/atoms/FormikTextField';
import { CardForm } from 'src/components/organisms/CardForm';
import * as yup from 'yup';
import { yupValidation } from '../../constants/yupValidation';

function ContactInfoForm({ user, loading, onSave }) {
  const [initialValues, setInitialValues] = React.useState({
    nickname: user.nickname || '',
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    phoneNumber: user.phoneNumber || '',
  });

  const validationSchema = yup.object().shape({
    nickname: yupValidation.nickname,
    firstName: yupValidation.firstName,
    lastName: yupValidation.lastName,
    email: yupValidation.email,
    phoneNumber: yupValidation.phoneNumber,
  });

  const onSubmit = (values) => {
    onSave(values).then(() => {
      setInitialValues(values);
    });
  };

  return (
    <CardForm header="KONTAKTNÍ ÚDAJE">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => onSubmit(values)}
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
