import React from 'react'
import { Box, Button } from '@material-ui/core'
import { Form, Formik } from 'formik'
import { FormikTextField } from 'src/atoms/FormikTextField'
import { regex } from 'src/constants/regex'
import { validText } from 'src/constants/validTexts'
import { useUser } from 'src/contexts/user'
import { gql, useMutation } from '@apollo/client'
import { useAuth } from '../utils/auth'
import {CardForm} from './CardForm'

const UPDATE_USER = gql`
  mutation UpdateUser($token: String!, $id: Int!, $street: String!, $city: String!, $zip: String!, $country: String!) {
    updateUser(token: $token, id: $id, street: $street, city: $city, zip: $zip, country: $country)
  }
`;

function AddressForm() {
  const { user } = useUser();
  const { auth } = useAuth();
  const [ updateUser, { loading } ] = useMutation(UPDATE_USER);

  const validate = (values) => ({
      street: !regex.street.test(values.street) && validText.street,
      city: !regex.name.test(values.city) && validText.city,
      zip: !regex.zip.test(values.zip) && validText.zip,
      country: !regex.name.test(values.country) && validText.country
  })

  const onSave = (values) => {
    updateUser({
      variables: {
        token: auth.token,
        id: user.id,
        street: values.street,
        city: values.city,
        zip: values.zip,
        country: values.country
      }
    })
    .then((response) => {
      if (response.data) {
        alert('Kontaktní údaje byly úspěšně uloženy.');
      } else {
        alert(response.errors || 'Kontaktní údaje nebyly uloženy.');
      }
    })
    .catch((error) => {
      alert(error);
    });
  };

  return (
    <CardForm header="ADRESA">
      <Formik
        enableReinitialize
        initialValues={{
          street: '',
          city: '',
          zip: '',
          country: ''
        }}
        onSubmit={(values) => onSave(values)}
        validate={(values) => validate(values)}>
        {(formikBag) => (
          <Form>
            <FormikTextField
              name="street"
              label="Ulice"
              placeholder="Zadejte ulici"
              formikBag={formikBag}/>
            <FormikTextField
              name="city"
              label="Město"
              placeholder="Zadejte město"
              formikBag={formikBag}/>
            <FormikTextField
              name="zip"
              label="PSČ"
              placeholder="Zadejte PSČ"
              formikBag={formikBag}/>
            <FormikTextField
              name="country"
              label="Stát"
              placeholder="Zadejte název státu"
              formikBag={formikBag}/>
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
                  disabled={loading}
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
