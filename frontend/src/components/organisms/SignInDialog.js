import React from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { Field, Form, Formik } from 'formik';
import { regex } from 'src/constants/regex';
import {
  IconButton,
  Box,
  Button,
  Dialog,
  DialogContent,
  Toolbar,
  Typography,
  TextField,
  InputLabel,
  FilledInput,
  InputAdornment,
  FormHelperText,
  FormControl,
} from '@material-ui/core';
import { Close, Visibility, VisibilityOff } from '@material-ui/icons';
import useTheme from '@material-ui/core/styles/useTheme';
import { useUser } from 'src/contexts/user';
import { compose, showMessage } from 'src/constants/functions';
import { route } from 'src/constants/routes';

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

export default function SignInDialog(props) {
  const {
    show, close, onForgotPassClick, onSignUpClick,
  } = props;
  const history = useHistory();
  const theme = useTheme();
  const { login } = useUser();
  const [signin, { loading }] = useMutation(SIGN_IN);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleShowingForgotPassword = compose(onForgotPassClick, close);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSave = (values) => {
    signin({
      variables: {
        email: values.email,
        password: values.password,
      },
    })
      .then((response) => {
        const user = response.data?.signin?.user;
        const token = response.data?.signin?.token;
        if (user && token) {
          login(token, user);
          close();
          history.push(route.profile());
        } else {
          showMessage(response.errors || 'Chybi uzivatel nebo token.');
        }
      })
      .catch((error) => {
        showMessage(error);
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
        style={{ backgroundColor: theme.palette.info.main }}
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
              render={(formikBag) => (
                <Form>
                  <Field
                    validateOnBlur
                    validateOnChange
                    name="email"
                    render={({ form }) => (
                      <TextField
                        id="signin-email"
                        name="email"
                        placeholder="Zadejte svůj email"
                        label="E-mail"
                        onChange={formikBag.handleChange}
                        error={Boolean(form.errors.email && form.touched.email)}
                        onBlur={formikBag.handleBlur}
                        helperText={
                          form.errors.email
                          && form.touched.email
                          && String(form.errors.email)
                        }
                        variant="filled"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                  <Field
                    validateOnBlur
                    validateOnChange
                    name="password"
                    render={({ form }) => (
                      <FormControl fullWidth variant="filled" margin="normal">
                        <InputLabel shrink htmlFor="filled-adornment-password">
                          Password
                        </InputLabel>
                        <FilledInput
                          id="signup-password"
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          placeholder="Zadejte své heslo"
                          onChange={formikBag.handleChange}
                          error={Boolean(form.errors.password && form.touched.password)}
                          onBlur={formikBag.handleBlur}
                          endAdornment={(
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          )}
                        />
                        <FormHelperText error>
                          {form.errors.password
                            && form.touched.password
                            && String(form.errors.password)
                            && 'Zadejte své heslo'}
                        </FormHelperText>
                      </FormControl>
                    )}
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
