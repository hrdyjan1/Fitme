/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { route } from 'src/constants/routes';
import { compose } from 'src/constants/functions/basic';
import 'src/components/organisms/header/navbar/style.css';
import { NAV, LINKS } from 'src/components/organisms/header/navbar/helpers';
import {
  Button,
  STYLES,
} from 'src/components/organisms/header/navbar/components/Button';
import {
  SignInDialog,
  SignUpDialog,
  ForgotPassDialog,
} from 'src/components/organisms';
import { useAuth } from 'src/utils/auth';
import { useUser } from 'src/contexts/user';

function Navbar() {
  const { fullName, logout } = useUser();
  const { token } = useAuth();
  const history = useHistory();
  const [active, setActive] = React.useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showForgotPass, setShowForgotPass] = useState(false);

  // Visible ✅
  const setSignInVisible = () => setShowSignIn(true);
  const setSignUpVisible = () => setShowSignUp(true);
  const setForgotPassVisible = () => setShowForgotPass(true);

  // Close ❌
  const setSignInHidden = () => setShowSignIn(false);
  const setSignUpHidden = () => setShowSignUp(false);
  const setForgotPassHidden = () => setShowForgotPass(false);

  const deactivate = () => setActive(false);
  const toggleActive = () => setActive((a) => !a);
  const historyPush = (path) => history.push(path);
  const goHome = () => historyPush(route.home());
  const goProfile = () => historyPush(route.profile());

  const ulClassName = active ? NAV.active.style : NAV.inactive.style;
  const goLink = compose(deactivate, historyPush);
  const goHomeDeactivate = compose(goHome, deactivate);
  const goProfileDeactivate = compose(goProfile, deactivate);
  const onLogout = compose(goHomeDeactivate, logout);
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
      <h1 className="navbar-logo" onClick={goHomeDeactivate} onKeyPress={goHomeDeactivate}>
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
        {LINKS.map((l) => {
          const onLinkClick = () => goLink(l.path);
          return (
            <li key={l.name}>
              <div
                className="nav-links"
                onClick={onLinkClick}
                role="button"
                onKeyPress={onLinkClick}
              >
                {l.name}
              </div>
            </li>
          );
        })}
        {token ? (
          <>
            <Button onClick={goProfileDeactivate}>
              <i className="fas fa-user" />
              {fullName}
            </Button>
            <Button style={STYLES[1]} onClick={onLogout}>
              Odhlásit se
            </Button>
          </>
        ) : (
          <Button onClick={onSignInClick}>Prihlasit se</Button>
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
    </nav>
  );
}

export { Navbar };
