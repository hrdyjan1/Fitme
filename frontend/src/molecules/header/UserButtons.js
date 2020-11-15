import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Box } from '@material-ui/core';

import { UserMenu } from 'src/molecules/header/UserMenu';
import { UserNameButton } from 'src/atoms/header/userNameButton';
import { useAuth } from 'src/utils/auth';
import { useUser } from 'src/contexts/user';
import { route } from 'src/constants/routes';

function UserButtons({ onSignInClick, onSignUpClick, onForgotPassClick }) {
  const history = useHistory();
  const { token } = useAuth();
  const { user, logout } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);

  const showUserMenu = (event) => setAnchorEl(event.currentTarget);

  const closeUserMenu = () => setAnchorEl(null);

  const onProfileClick = () => {
    setAnchorEl(null);
    history.push(route.profile());
  };

  const onLogout = () => {
    logout();
    setAnchorEl(null);
    history.push(route.home());
  };

  return token ? (
    <Box display="flex" flexDirection="row">
      <Box>
        <UserNameButton firstName={user.firstName} onClick={showUserMenu} />
        <UserMenu
          onProfileClick={onProfileClick}
          onLogoutClick={onLogout}
          onClose={closeUserMenu}
          anchorEl={anchorEl}
        />
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

export { UserButtons };
