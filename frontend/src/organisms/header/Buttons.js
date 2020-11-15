import React from 'react';
import { Button, Box } from '@material-ui/core';

import { useAuth } from 'src/utils/auth';
import { useUser } from 'src/contexts/user';

function HeaderButtons({ onSignInClick, onSignUpClick, onForgotPassClick }) {
  const { token } = useAuth();
  const { logout } = useUser();

  return token ? (
    <Box display="flex" flexDirection="row">
      <Box>
        <Button variant="contained" color="primary" onClick={logout}>
          Odhlasit
        </Button>
      </Box>
    </Box>

  ) : (
    <Box display="flex" flexDirection="row">
      <Box marginRight="20px">
        <Button variant="contained" color="primary" onClick={onForgotPassClick}>
          Zapomenute heslo
        </Button>
      </Box>
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

export { HeaderButtons };
