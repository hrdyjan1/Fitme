import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Box, Button,
} from '@material-ui/core';
import { SignInDialog, SignUpDialog, ForgotPassDialog } from 'src/organisms';
import { UserButtons } from 'src/molecules/header/UserButtons';
import { useHistory } from 'react-router-dom';
import { route } from 'src/constants/routes';

function TopBar() {
  const history = useHistory();
  const [showSignInDialog, setShowSignInDialog] = useState(false);
  const [showSignUpDialog, setShowSignUpDialog] = useState(false);
  const [showForgotPassDialog, setShowForgotPassDialog] = useState(false);

  const goHomePage = () => history.push(route.home());

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
          <Button onClick={goHomePage}>
            <Typography variant="h6">
              <Box fontWeight="fontWeightBold">FitMe</Box>
            </Typography>
          </Button>
          <Box>
            <UserButtons
              onSignInClick={onSignInClick}
              onSignUpClick={onSignUpClick}
              onForgotPassClick={onForgotPassClick}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <SignInDialog show={showSignInDialog} close={closeSignIn} />
      <SignUpDialog show={showSignUpDialog} close={closeSignUp} />
      <ForgotPassDialog show={showForgotPassDialog} close={closeForgotPass} />
    </div>
  );
}

export { TopBar };
