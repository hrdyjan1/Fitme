import React from 'react';
import { Box, Button } from '@material-ui/core';
import { Form, Formik } from 'formik';

import { regex } from 'src/constants/regex';
import { validText } from 'src/constants/validTexts';
import { CardForm } from 'src/components/organisms/CardForm';
import { FormikTextField } from 'src/components/atoms';

function AddressForm({ user, loading, onSave }) {
  const [initialValues, setInitialValues] = React.useState({
    street: user.street || '',
    city: user.city || '',
    zipCode: user.zipCode || '',
    country: user.country || '',
  });

  const validate = (values) => {
    const errors = {};
    if (!regex.street.test(values.street)) errors.street = validText.street;
    if (!regex.name.test(values.city)) errors.city = validText.city;
    if (!regex.zipCode.test(values.zipCode)) errors.zipCode = validText.zipCode;
    if (!regex.name.test(values.country)) errors.country = validText.country;
    return errors;
  };

  const onSubmit = (values) => {
    onSave(values).then(() => {
      setInitialValues(values)
    })
  }

  return (
    <CardForm header="ADRESA">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values) => onSubmit(values)}
        validate={(values) => validate(values)}
      >
        {(formikBag) => (
          <Form>
            <FormikTextField
              name="street"
              label="Ulice a č.p."
              placeholder="Zadejte ulici a č.p."
            />
            <FormikTextField
              name="city"
              label="Město"
              placeholder="Zadejte město"
            />
            <FormikTextField
              name="zipCode"
              label="PSČ"
              placeholder="Zadejte PSČ"
            />
            <FormikTextField
              name="country"
              label="Stát"
              placeholder="Zadejte název státu"
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

export { AddressForm };
