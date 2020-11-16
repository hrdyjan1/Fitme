import React from 'react';
import { Box, Button } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { FormikTextField } from 'src/atoms/FormikTextField';
import { regex } from 'src/constants/regex';
import { validText } from 'src/constants/validTexts';
import { CardForm } from './CardForm';

function AddressForm({ user, loading, onSave }) {
  const validate = (values) => ({
    street: !regex.street.test(values.street) && validText.street,
    city: !regex.name.test(values.city) && validText.city,
    zipCode: !regex.zipCode.test(values.zipCode) && validText.zipCode,
    country: !regex.name.test(values.country) && validText.country,
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
    <CardForm header="ADRESA">
      <Formik
        enableReinitialize
        initialValues={{
          street: user.street,
          city: user.city,
          zipCode: user.zipCode,
          country: user.country,
        }}
        onSubmit={(values) => onSave(values)}
        validate={(values) => validate(values)}
      >
        {(formikBag) => (
          <Form>
            <FormikTextField
              name="street"
              label="Ulice a č.p."
              placeholder="Zadejte ulici a č.p."
              formikBag={formikBag}
            />
            <FormikTextField
              name="city"
              label="Město"
              placeholder="Zadejte město"
              formikBag={formikBag}
            />
            <FormikTextField
              name="zipCode"
              label="PSČ"
              placeholder="Zadejte PSČ"
              formikBag={formikBag}
            />
            <FormikTextField
              name="country"
              label="Stát"
              placeholder="Zadejte název státu"
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

export { AddressForm };
