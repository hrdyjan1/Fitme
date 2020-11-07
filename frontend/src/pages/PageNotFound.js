import React from 'react';
import { useLocation } from 'react-router-dom';
import { pickUpToken, Verification } from 'src/pages/Verification';

function PageNotFound() {
  const location = useLocation();

  const token = pickUpToken(location.pathname);

  return token ? <Verification token={token} /> : (
    <div className="appWrapper">
      <h1>Error 404:</h1>
      <p>Page not found</p>
    </div>

  );
}

export { PageNotFound };
