import React from 'react'
import { Box, Button } from '@material-ui/core'
import { Form, Formik } from 'formik'
import { FormikTextField } from 'src/atoms/FormikTextField'
import { CardForm } from 'src/organisms'
import { regex } from 'src/constants/regex'
import { useUser } from 'src/contexts/user'
import { gql, useMutation } from '@apollo/client'
import {validText} from '../constants/validTexts'
import {useAuth} from '../utils/auth'

const UPDATE_USER = gql`
  mutation UpdateUser($token: String!, $id: Int!, $nickname: String!, $firstname: String!, $lastname: String!, $email: String!, $phone: String!) {
    updateUser(token: $token, id: $id, nickname: $nickname, firstname: $firstname, lastname: $lastname, email: $email, phone: $phone)
  }
`;

const CHANGE_PASSWORD = gql`
  mutation UpdateUser($token: String!, $id: Int!, $nickname: String!, $firstname: String!, $lastname: String!, $email: String!, $phone: String!) {
    updateUser(token: $token, id: $id, nickname: $nickname, firstname: $firstname, lastname: $lastname, email: $email, phone: $phone)
  }
`;

function ContactInfoForm() {
  const { user } = useUser();
  const { auth } = useAuth();
  const [ updateUser, { loading } ] = useMutation(UPDATE_USER);

  const validate = (values) => ({
    nickname: !regex.name.test(values.nickname) && validText.street,
    firstname: !regex.name.test(values.firstname) && validText.city,
    lastname: !regex.name.test(values.lastname) && validText.zip,
    email: !regex.email.test(values.email) && validText.email,
    phone: !regex.phone.test(values.phone) && validText.phone
  })

  const onSave = (values) => {
    updateUser({
      variables: {
        token: auth.token,
        id: user.id,
        nickname: values.nickname,
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        phone: values.phone,
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
    <CardForm header="KONTAKTNÍ ÚDAJE">
      <Formik
        enableReinitialize
        initialValues={{
          nickname: user.nickname,
          firstname: user.firstName,
          lastname: user.lastName,
          email: user.email,
          phone: user.phone
        }}
        onSubmit={(values) => onSave(values)}
        validate={(values) => validate(values)}>
        {(formikBag) => (
          <Form>
            <FormikTextField
              name="nickname"
              label="přezdívka"
              placeholder="Zadejte svou přezdívku"
              formikBag={formikBag}/>
            <FormikTextField
              name="firstname"
              label="Jméno"
              placeholder="Zadejte své jméno"
              formikBag={formikBag}/>
            <FormikTextField
              name="lastname"
              label="Příjmení"
              placeholder="Zadejte své příjmení"
              formikBag={formikBag}/>
            <FormikTextField
              name="email"
              label="E-mail"
              placeholder="Zadejte svůj e-mail"
              formikBag={formikBag}/>
            <FormikTextField
              name="phone"
              label="Telefon"
              placeholder="Zadejte své telefonní číslo"
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

export { ContactInfoForm };
