import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { isFilledArray } from 'src/constants/array';
import {
  AppBar, Toolbar, Button, Typography, Box,
} from '@material-ui/core';
import SignUpDialog from 'src/components/SignUpDialog';
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
      <Button variant="contained" color="primary" onClick={logout}>
        Odhlasit
      </Button>
    </>
  ) : (
    <Button variant="contained" color="primary" onClick={onClick}>
      Registrovat
    </Button>
  );
}

export function HomePage() {
  const { data } = useQuery(GET_PLACES);
  const places = isFilledArray(data?.places) ? data?.places : null;
  const [showSignUpDialog, setShowSignUpDialog] = useState(false);

  return (
    <div>
      <AppBar color="transparent" position="static" className="appBar">
        <Toolbar variant="regular" className="toolbar">
          <Typography variant="h6">
            <Box fontWeight="fontWeightBold">FitMe</Box>
          </Typography>
          <HeaderInfo onClick={() => setShowSignUpDialog(true)} />
        </Toolbar>
      </AppBar>
      <div className="appWrapper">
        <h1>Fit.me</h1>
        <h2>Sport places</h2>
        {places && places.map((p) => <p>{p.name}</p>) }
      </div>
      <SignUpDialog show={showSignUpDialog} close={() => { setShowSignUpDialog(false); }} />
    </div>
  );
}
