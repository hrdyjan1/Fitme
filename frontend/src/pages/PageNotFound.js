import React from 'react';
import { useLocation } from 'react-router-dom';
import { pickUpVerToken, Verification } from 'src/pages/Verification';
import { pickUpLockToken, ResetPassword } from 'src/pages/ResetPassword';

function PageNotFound() {
  const location = useLocation();

  const verToken = pickUpVerToken(location.pathname);
  const lockToken = pickUpLockToken(location.pathname);

  if (verToken) {
    return <Verification token={verToken} />;
  }
  if (lockToken) {
    return <ResetPassword token={lockToken} />;
  }
  return (
    <div className="app-wrapper">
      <h1>Error 404:</h1>
      <p>Page not found</p>
    </div>
  );
}

export { PageNotFound };
