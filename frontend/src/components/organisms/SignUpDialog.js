import React from 'react';
import { gql, useMutation } from '@apollo/client';
import {
  IconButton,
  Box,
  Dialog,
  DialogContent,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import useTheme from '@material-ui/core/styles/useTheme';
import { SignUpForm } from 'src/components/organisms'

import { SEVERITY, useNotification } from 'src/contexts/notification';

const SIGN_UP = gql`
  mutation SignUp(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    signup(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
    }
  }
`;

const SIGN_UP_PLACE = gql`
  mutation SignUpPlace(
    $firstName: String!
    $lastName: String!
    $name: String!
    $ico: String!
    $email: String!
    $password: String!
  ) {
    signupPlace(
      firstName: $firstName
      lastName: $lastName
      name: $name
      ico: $ico
      email: $email
      password: $password
    ) {
      token
    }
  }
`;


export default function SignUpDialog({ show, close }) {
  const theme = useTheme();
  const [signupAthlete, { loadingAthlete }] = useMutation(SIGN_UP);
  const [signupPlace, { loadingPlace }] = useMutation(SIGN_UP_PLACE);
  const { showMessage } = useNotification();

  const onSave = (values) => {
    if (values.userType === 'athlete') {
      onSaveAthlete(values)
    } else if (values.userType === 'place') {
      onSavePlace(values)
    }
  };

  const onSaveAthlete = (values) => {
    signupAthlete({
      variables: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password
      },
    })
    .then((response) => {
      if (response.data?.signupPlace?.token) {
        showMessage('Nyní si zkontrolujte email.');
        close();
      } else {
        showMessage(String(response.errors), SEVERITY.ERROR);
      }
    })
    .catch((error) => {
      showMessage(String(error.message), SEVERITY.ERROR);
    });
  }

  const onSavePlace = (values) => {
    signupPlace({
      variables: {
        firstName: values.firstName,
        lastName: values.lastName,
        name: values.organization,
        ico: values.ico,
        email: values.email,
        password: values.password
      },
    })
    .then((response) => {
      if (response.data?.signup?.token) {
        showMessage('Nyní si zkontrolujte email.');
        close();
      } else {
        showMessage(String(response.errors), SEVERITY.ERROR);
      }
    })
    .catch((error) => {
      showMessage(String(error.message), SEVERITY.ERROR);
    });
  }

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
          <Typography variant="h6">Registrace do aplikace FitMe</Typography>
        </Box>
        <IconButton onClick={onClose}>
          <Close fontSize="large" style={{ color: 'white' }} />
        </IconButton>
      </Toolbar>
      <DialogContent>
        <Box textAlign="center" justifyContent="center" >
          <SignUpForm onSave={onSave} loading={loadingAthlete || loadingPlace}/>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
