/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';
import { useHistory } from 'react-router-dom';

import { route } from 'src/constants/routes';
import 'src/components/organisms/header/navbar/style.css';
import { NAV } from 'src/components/organisms/header/navbar/helpers';
import { Button } from 'src/components/organisms/header/navbar/components/Button';

function Navbar() {
  const history = useHistory();
  const [active, setActive] = React.useState(false);

  const click = () => setActive((a) => !a);
  const onLinkClick = () => history.push(route.signin());

  const ulClassName = active ? NAV.active.style : NAV.inactive.style;

  return (
    <nav className="NavbarItems">
      <h1 className="navbar-logo">
        Fit.me
        <i className="fas fa-basketball-ball fa-logo" />
      </h1>
      <div className="menu-icon" onClick={click} role="button" onKeyPress={click}>
        <i className="fas fa-bars" />
      </div>
      <ul className={ulClassName}>
        {[1, 2, 3].map((l) => (
          <li key={l}>
            <div className="nav-links" onClick={onLinkClick} role="button" onKeyPress={onLinkClick}>Sign In</div>
          </li>
        ))}
        <Button>Sign In</Button>
      </ul>
    </nav>
  );
}

export { Navbar };
