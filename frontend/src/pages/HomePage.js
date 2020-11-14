import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { isFilledArray } from 'src/constants/array';
import {
  AppBar, Toolbar, Typography, Box,
} from '@material-ui/core';
import { ForgotPassDialog, SignInDialog, SignUpDialog } from 'src/organisms';
import { UserButtons } from 'src/molecules/header/UserButtons';

const GET_PLACES = gql`
  query GetPlaces {
    places {
      id
      name
      description
    }
  }
`;

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
