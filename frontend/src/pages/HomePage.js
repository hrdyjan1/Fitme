import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { isFilledArray } from 'src/constants/array';
import {
  AppBar, Toolbar, Typography, Box,
} from '@material-ui/core';
<<<<<<< HEAD
import SignUpDialog from 'src/components/SignUpDialog';
import { useUserContext } from 'src/contexts/user';
import { DefaultButton } from 'src/atoms/'
=======
import { ForgotPassDialog, SignInDialog, SignUpDialog } from 'src/organisms';
import { UserButtons } from 'src/molecules/header/UserButtons';
>>>>>>> 9baa6aba339ccea2406580859d081ee5f7ed187e

const GET_PLACES = gql`
  query GetPlaces {
    places {
      id
      name
      description
    }
  }
`;

<<<<<<< HEAD
function HeaderInfo({ onClick }) {
  const { fullName, logout, user } = useUserContext();
  const ver = user?.verified === 1 ? 'ano overeno' : 'neovereno';

  return fullName ? (
    <>
      <h3>
        {fullName}
        {' '}
        {ver}
      </h3>
      <DefaultButton onClick={logout}>
        Odhlasit
      </DefaultButton>
    </>
  ) : (
    <DefaultButton onClick={onClick}>
      Registrovat
    </DefaultButton>
  );
}

=======
>>>>>>> 9baa6aba339ccea2406580859d081ee5f7ed187e
export function HomePage() {
  const { data } = useQuery(GET_PLACES);
  const places = isFilledArray(data?.places) ? data?.places : null;
  const [showSignInDialog, setShowSignInDialog] = useState(false);
  const [showSignUpDialog, setShowSignUpDialog] = useState(false);
  const [showForgotPassDialog, setShowForgotPassDialog] = useState(false);

  // Open ✅
  const onSignInClick = () => setShowSignInDialog(true);
  const onSignUpClick = () => setShowSignUpDialog(true);
  const onForgotPassClick = () => setShowForgotPassDialog(true);

  // Close ❌
  const closeSignIn = () => setShowSignInDialog(false);
  const closeSignUp = () => setShowSignUpDialog(false);
  const closeForgotPass = () => setShowForgotPassDialog(false);

  return (
    <div>
      <AppBar color="transparent" position="static" className="appBar">
        <Toolbar variant="regular" className="toolbar">
          <Typography variant="h6">
            <Box fontWeight="fontWeightBold">FitMe</Box>
          </Typography>
          <Box>
            <UserButtons
              onSignInClick={onSignInClick}
              onSignUpClick={onSignUpClick}
              onForgotPassClick={onForgotPassClick}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <div className="appWrapper">
        <h1>Fit.me</h1>
        <h2>Sport places</h2>
        {places && places.map((p) => <p>{p.name}</p>) }
      </div>
      <SignInDialog show={showSignInDialog} close={closeSignIn} />
      <SignUpDialog show={showSignUpDialog} close={closeSignUp} />
      <ForgotPassDialog show={showForgotPassDialog} close={closeForgotPass} />
    </div>
  );
}
