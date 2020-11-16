import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Box,
} from '@material-ui/core';
import { SignInDialog, SignUpDialog, ForgotPassDialog } from 'src/organisms';
import { UserButtons } from 'src/molecules/header/UserButtons';

function TopBar() {
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
      <SignInDialog show={showSignInDialog} close={closeSignIn} />
      <SignUpDialog show={showSignUpDialog} close={closeSignUp} />
      <ForgotPassDialog show={showForgotPassDialog} close={closeForgotPass} />
    </div>
  );
}

export {TopBar};
