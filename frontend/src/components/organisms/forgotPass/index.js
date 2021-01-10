import React from 'react';
import {
  Box,
  Dialog,
  Button,
  Toolbar,
  TextField,
  IconButton,
  Typography,
  DialogContent,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Field, Form, Formik } from 'formik';
import useTheme from '@material-ui/core/styles/useTheme';

import {
  initialFormValues,
  validate,
  FORGOT_PASS,
  handleInvalidEmail,
  handleValidEmail,
} from 'src/components/organisms/forgotPass/helpers';
import { useMutation } from '@apollo/client';
import { useNotification } from 'src/contexts/notification';
import { compose } from 'src/constants/functions/basic';

function ForgotPassDialog({ show, close }) {
  const theme = useTheme();
  const { showMessage, showErrorMessage } = useNotification();
  const [changePass, { loading }] = useMutation(FORGOT_PASS);

  const onSubmit = ({ email }) => {
    changePass({ variables: { email } }).then((res) => {
      if (res.data?.sendEmailForgotPass) {
        showMessage(handleValidEmail());
      }
      close();
    }, compose(showErrorMessage, handleInvalidEmail));
  };

  return (
    <Dialog fullWidth className="registration" open={show}>
      <Toolbar
        variant="regular"
        className="toolbar"
        style={{ backgroundColor: theme.palette.primary.main }}
      >
        <div />
        <Box color="white">
          <Typography variant="h6">
            Zapomenuté heslo do aplikace FitMe
          </Typography>
        </Box>
        <IconButton onClick={close}>
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
              onSubmit={onSubmit}
              validate={validate}
              initialValues={initialFormValues}
              render={(formikBag) => (
                <Form>
                  <Field
                    validateOnBlur
                    validateOnChange
                    name="email"
                    render={({ form }) => (
                      <TextField
                        id="forgot-pass-email"
                        name="email"
                        placeholder="Zadejte svůj email"
                        label="E-mail"
                        onChange={formikBag.handleChange}
                        error={Boolean(form.errors.email && form.touched.email)}
                        onBlur={formikBag.handleBlur}
                        helperText={
                          form.errors.email &&
                          form.touched.email &&
                          String(form.errors.email)
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
                        Odeslat
                      </Button>
                    </Box>
                  </Box>
                </Form>
              )}
            />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ForgotPassDialog;
