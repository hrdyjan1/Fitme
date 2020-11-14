import React from 'react'
import { Box, Button } from '@material-ui/core'
import { Form, Formik } from 'formik'
import { FormikTextField } from 'src/atoms/FormikTextField'
import { CardForm } from 'src/organisms'
import { regex } from 'src/constants/regex'
import {validText} from 'src/constants/validTexts'

function ContactInfoForm({ user, error, loading, onSave }) {

  const validate = (values) => ({
    nickname: !regex.name.test(values.nickname) && validText.nickname,
    firstname: !regex.name.test(values.firstname) && validText.city,
    lastname: !regex.name.test(values.lastname) && validText.zip,
    email: !regex.email.test(values.email) && validText.email,
    phone: !regex.phone.test(values.phone) && validText.phone
  })

  const onSaveClick = (values, errors) => {
    if (!Object.values(errors).some(error => !!error) && Object.values(values).some(value => !value)) {
      onSave(values.values)
    }
  }

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
                  disabled={loading || Object.values(formikBag.values).some(value => !value)}
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

export { ContactInfoForm };
