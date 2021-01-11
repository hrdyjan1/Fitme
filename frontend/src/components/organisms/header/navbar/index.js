/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { route } from 'src/constants/routes';
import { compose } from 'src/constants/functions/basic';
import 'src/components/organisms/header/navbar/style.css';
import { NAV } from 'src/components/organisms/header/navbar/helpers';
import {
  Button,
  STYLES,
} from 'src/components/organisms/header/navbar/components/Button';
import { SignInDialog, SignUpDialog } from 'src/pages';
import { LogoutDialog, ForgotPassDialog } from 'src/components/organisms';
import { useAuth } from 'src/utils/auth';
import { useUser } from 'src/contexts/user';

function Navbar() {
  const { token } = useAuth();
  const history = useHistory();
  const { user } = useUser();
  const [active, setActive] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showForgotPass, setShowForgotPass] = useState(false);

  // Visible ✅
  const setSignInVisible = () => setShowSignIn(true);
  const setSignUpVisible = () => setShowSignUp(true);
  const setLogoutVisible = () => setShowLogout(true);
  const setForgotPassVisible = () => setShowForgotPass(true);

  // Close ❌
  const setSignInHidden = () => setShowSignIn(false);
  const setSignUpHidden = () => setShowSignUp(false);
  const setLogoutHidden = () => setShowLogout(false);
  const setForgotPassHidden = () => setShowForgotPass(false);

  const deactivate = () => setActive(false);
  const toggleActive = () => setActive((a) => !a);
  const historyPush = (path) => history.push(path);
  const goHome = () => historyPush(route.home());
  const goSportPlaces = () => historyPush(route.sportPlaces());

  const ulClassName = active ? NAV.active.style : NAV.inactive.style;
  const goHomeDeactivate = compose(goHome, deactivate);
  const onUserNameClick = () => history.push(route.userProfileRoute(user.type));
  const onLogoutClick = compose(goHomeDeactivate, setLogoutVisible);
  const onSignInClick = compose(
    setSignInVisible,
    setSignUpHidden,
    setForgotPassHidden,
    deactivate,
  );
  const onSignUpClick = compose(
    setSignUpVisible,
    setSignInHidden,
    setForgotPassHidden,
    deactivate,
  );
  const onForgotPassClick = compose(
    setForgotPassVisible,
    setSignInHidden,
    setSignUpHidden,
    deactivate,
  );

  return (
    <nav className="NavbarItems">
      <h1
        className="navbar-logo"
        onClick={goHomeDeactivate}
        onKeyPress={goHomeDeactivate}
      >
        Fit.me
        <i className="fas fa-basketball-ball fa-logo" />
      </h1>
      <div
        className="menu-icon"
        onClick={toggleActive}
        role="button"
        onKeyPress={toggleActive}
      >
        <i className="fas fa-bars" />
      </div>
      <ul className={ulClassName}>
        <li key="places">
          <div
            className="nav-links"
            onClick={goSportPlaces}
            role="button"
            onKeyPress={goSportPlaces}
          >
            Sportoviště
          </div>
        </li>
        {token ? (
          <>
            <Button onClick={onUserNameClick}>
              <i className="fas fa-user" />
              {user.firstName}
              {' '}
              {user.lastName}
            </Button>
            <Button style={STYLES[1]} onClick={onLogoutClick}>
              Odhlásit se
            </Button>
          </>
        ) : (
          <>
            <Button onClick={onSignInClick}>Přihlásit se</Button>
            <Button onClick={onSignUpClick} style={STYLES[2]}>
              Zaregistrovat se
            </Button>
          </>
        )}
      </ul>
      <SignInDialog
        show={showSignIn}
        close={setSignInHidden}
        onForgotPassClick={onForgotPassClick}
        onSignUpClick={onSignUpClick}
      />
      <SignUpDialog show={showSignUp} close={setSignUpHidden} />
      <ForgotPassDialog show={showForgotPass} close={setForgotPassHidden} />
      <LogoutDialog show={showLogout} close={setLogoutHidden} />
    </nav>
  );
}

export { Navbar };
