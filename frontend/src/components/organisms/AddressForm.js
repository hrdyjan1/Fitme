import React from 'react';
import { Box, Button } from '@material-ui/core';
import { Form, Formik } from 'formik';

import { CardForm } from 'src/components/organisms/CardForm';
import { FormikTextField } from 'src/components/atoms';
import * as yup from 'yup';
import { yupValidation } from '../../constants/yupValidation';

function AddressForm({ user, loading, onSave }) {
  const [initialValues, setInitialValues] = React.useState({
    street: user.street || '',
    city: user.city || '',
    zipCode: user.zipCode || '',
    country: user.country || '',
  });

  const validationSchema = yup.object().shape({
    street: yupValidation.street,
    city: yupValidation.city,
    zipCode: yupValidation.zipCode,
    country: yupValidation.country,
  });

  const onSubmit = (values) => {
    onSave(values).then(() => {
      setInitialValues(values);
    });
  };

  return (
    <CardForm header="ADRESA">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => onSubmit(values)}
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
