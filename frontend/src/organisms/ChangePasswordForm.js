import React from 'react'
import { Box, Button } from '@material-ui/core'
import { Form, Formik } from 'formik'
import { FormikPasswordField } from 'src/atoms'
import { regex } from 'src/constants/regex'
import { useUser } from 'src/contexts/user'
import { gql, useMutation } from '@apollo/client'
import {validText} from '../constants/validTexts'
import {useAuth} from '../utils/auth'
import {CardForm} from './CardForm'

const UPDATE_USER = gql`
  mutation UpdateUser($token: String!, $id: Int!, $oldPassword: String!, $newPassword: String!) {
    updateUser(token: $token, id: $id, oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;

function ChangePasswordForm() {
  const { user } = useUser();
  const { auth } = useAuth();
  const [ updateUser, { loading } ] = useMutation(UPDATE_USER);

  const validate = (values) => ({
    newPassword: !regex.password.test(values.street) && validText.password,
    newPasswordCheck: (values.password !== values.newPasswordCheck) && validText.passwordCheck,
  })

  const onSave = (values) => {
    updateUser({
      variables: {
        token: auth.token,
        id: user.id,
        oldPassword: values.oldPassword,
        newPassword: values.city,
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
    <CardForm header="ZMĚNIT HESLO">
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
            <FormikPasswordField
              name="oldPassword"
              label="Staré heslo"
              placeholder="Zadejte vaše aktuální heslo"
              formikBag={formikBag}/>
            <FormikPasswordField
              name="newPassword"
              label="Nové heslo"
              placeholder="Zadejte město"
              formikBag={formikBag}/>
            <FormikPasswordField
              name="newPasswordCheck"
              label="Potvrzení nového hesla"
              placeholder="Zadejte nové heslo znovu"
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

export { ChangePasswordForm };
