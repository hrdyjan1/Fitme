import React, {useState} from 'react'
import { gql, useQuery } from '@apollo/client';
import { isFilledArray } from 'src/constants/array';
import { AppBar, Toolbar, Button, Typography, Box  } from '@material-ui/core';
import SignUpDialog from 'src/components/SignUpDialog'
import LogInDialog from 'src/components/LogInDialog'

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
  const [showSignUpDialog, setShowSignUpDialog] = useState(false);
  const [showLogInDialog, setShowLogInDialog] = useState(false);

  return (
    <div>
      <AppBar color="transparent" position="static" className={'appBar'}>
        <Toolbar variant="regular" className={'toolbar'}>
          <Typography variant="h6">
            <Box fontWeight="fontWeightBold">FitMe</Box>
          </Typography>
          <Button variant="contained" color="primary" onClick={() => {setShowLogInDialog(true)}}>
            Přihlásit se
          </Button>
          <Button variant="contained" color="primary" onClick={() => {setShowSignUpDialog(true)}}>
            Registrovat
          </Button>
        </Toolbar>
      </AppBar>
      <div className={'appWrapper'}>
      <h1>Fit.me</h1>
      <h2>Sport places</h2>
      {places && places.map((p) => <p>{p.name}</p>) }
      </div>
      <SignUpDialog show={showSignUpDialog} close={() => {setShowSignUpDialog(false)}}/>
      <LogInDialog show={showLogInDialog} close={() => {setShowLogInDialog(false)}}/>
    </div>
  );
}
