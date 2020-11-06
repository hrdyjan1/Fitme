import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { isFilledArray } from 'src/constants/array';
import {
  AppBar, Toolbar, Button, Typography, Box,
} from '@material-ui/core';
import { SignInDialog, SignUpDialog } from 'src/organisms';
import { useUserContext } from 'src/contexts/user';

const GET_PLACES = gql`
  query GetPlaces {
    places {
      id
      name
      description
    }
  }
`;

function HeaderInfo({onSignInClick, onSignUpClick }) {
  const { fullName, logout, user } = useUserContext();
  const ver = user?.verified === 1 ? 'ano overeno' : 'neovereno';

  return fullName ? (
    <>
      <h3>
        {fullName}
        {' '}
        {ver}
      </h3>
      <Button variant="contained" color="primary" onClick={logout}>
        Odhlasit
      </Button>
    </>
  ) : (
    <Box display="flex" flexDirection="row">
      <Box marginRight="20px">
        <Button variant="contained" color="primary" onClick={onSignInClick}>
          Přihlásit
        </Button>
      </Box>
      <Box>
        <Button variant="contained" color="primary" onClick={onSignUpClick}>
          Registrovat
        </Button>
      </Box>
    </Box>
  );
}

export function HomePage() {
  const { data } = useQuery(GET_PLACES);
  const places = isFilledArray(data?.places) ? data?.places : null;
  const [showSignInDialog, setShowSignInDialog] = useState(false);
  const [showSignUpDialog, setShowSignUpDialog] = useState(false);

  return (
    <div>
      <AppBar color="transparent" position="static" className="appBar">
        <Toolbar variant="regular" className="toolbar">
          <Typography variant="h6">
            <Box fontWeight="fontWeightBold">FitMe</Box>
          </Typography>
          <Box>
            <HeaderInfo
              onSignInClick={() => setShowSignInDialog(true)}
              onSignUpClick={() => setShowSignUpDialog(true)}/>
          </Box>
        </Toolbar>
      </AppBar>
      <div className="appWrapper">
        <h1>Fit.me</h1>
        <h2>Sport places</h2>
        {places && places.map((p) => <p>{p.name}</p>) }
      </div>
      <SignInDialog show={showSignInDialog} close={() => { setShowSignInDialog(false); }} />
      <SignUpDialog show={showSignUpDialog} close={() => { setShowSignUpDialog(false); }} />
    </div>
  );
}
