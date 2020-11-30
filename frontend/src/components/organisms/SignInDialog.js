import React from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { Form, Formik } from 'formik';
import { regex } from 'src/constants/regex';
import {
  IconButton,
  Box,
  Button,
  Dialog,
  DialogContent,
  Toolbar,
  Typography
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import useTheme from '@material-ui/core/styles/useTheme';
import { useUser } from 'src/contexts/user';
import { SEVERITY, useNotification } from 'src/contexts/notification';
import { compose } from 'src/constants/functions/basic';
import { route } from 'src/constants/routes';
import { FormikPasswordField, FormikTextField } from '../atoms'

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
      user {
        id
        email
        firstName
        lastName,
        type
      }
    }
  }
`;

export default function SignInDialog({
  show,
  close,
  onSignUpClick,
  onForgotPassClick,
}) {
  const theme = useTheme();
  const { login } = useUser();
  const history = useHistory();
  const { showMessage } = useNotification();
  const [signin, { loading }] = useMutation(SIGN_IN);

  const handleShowingForgotPassword = compose(onForgotPassClick, close);
  const showUserProfile = (user) => {
    user.type === 'place' ? history.push(route.editSportPlace()) : history.push(route.profile());
  }

  const onSave = (values) => {
    signin({
      variables: {
        email: values.email,
        password: values.password,
      },
    })
      .then((response) => {
        console.log(JSON.stringify(response.data))
        const user = response.data?.signin?.user;
        const token = response.data?.signin?.token;
        if (user && token) {
          login(token, user);
          close();
          showUserProfile(user)
        } else {
          showMessage(String(response.errors) || 'Chybi uzivatel nebo token.', SEVERITY.ERROR);
        }
      })
      .catch((error) => {
        showMessage(String(error.message), SEVERITY.ERROR);
      });
  };

  const onClose = () => {
    close();
  };

  return (
    <Dialog fullWidth className="registration" open={show} disableScrollLock>
      <Toolbar
        variant="regular"
        className="toolbar"
        style={{ backgroundColor: theme.palette.primary.main }}
      >
        <div />
        <Box color="white">
          <Typography variant="h6">Přihlášení do aplikace FitMe</Typography>
        </Box>
        <IconButton onClick={() => onClose()}>
          <Close fontSize="large" style={{ color: 'white' }} />
        </IconButton>
      </Toolbar>
      <DialogContent>
        <Box
          marginTop="20px"
          width="100%"
          display="flex"
          flexDirection="column"
          flexWrap="wrap"
          alignItems="center"
        >
          <Box width="65%">
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={(values) => onSave(values)}
              validate={(values) => {
                const errors = {};
                if (!regex.email.test(values.email)) {
                  errors.email = 'Zadejte e-mail ve správném formátu';
                }
                if (!values.password) {
                  errors.password = 'Zadejte své heslo';
                }
                return errors;
              }}
              render={() => (
                <Form>
                  <FormikTextField name="email" label="E-mail" placeholder="Zadejte svůj e-mail" />
                  <FormikPasswordField name="password" label="Heslo" placeholder="Zadeje své heslo" />
                  <Box
                    marginTop="30px"
                    marginBottom="30px"
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
                        Přihlásit
                      </Button>
                    </Box>
                  </Box>
                </Form>
              )}
            />
          </Box>
          <Box width="97%" m="auto">
            <Button
              onClick={handleShowingForgotPassword}
              type="submit"
              size="large"
              fullWidth
              color="secondary"
            >
              Zapomněli jste heslo?
            </Button>
          </Box>
          <Box width="97%" m="auto">
            <Button
              onClick={onSignUpClick}
              type="submit"
              size="large"
              fullWidth
              color="primary"
            >
              Nemáte ještě účet? Zaregistrujte se!
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
