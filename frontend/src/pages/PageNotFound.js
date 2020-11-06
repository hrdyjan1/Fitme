import React from 'react';
import { useLocation } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const VERIFY = gql`
  mutation verifyVoe($token: String!) {
    verify(token: $token)
  }
`;

function Verification({ token }) {
  const [verify, { data }] = useMutation(VERIFY);

  React.useEffect(() => {
    verify({ variables: { token } })
      .then((r) => {
        if (r.data) {
          console.log(r.data);
        }
        if (r.errors) {
          console.log(r.errors);
        }
      })
      .catch((e) => alert(e));
  }, [token, verify]);

  if (data?.verify) {
    return <p>Overeno</p>;
  } if (data?.verify === false) {
    return <p>Uzivatel jiz overen nebo vase adresa jiz neni platna.</p>;
  }
  return <div />;
}

function PageNotFound() {
  const location = useLocation();

  const isVerToken = location.pathname.includes('verificationToken');
  if (isVerToken) {
    const token = location.pathname.match(/=(.+)/)[1];
    return (
      <Verification token={token} />
    );
  }

  return (
    <div className="appWrapper">
      <h1>Error 404:</h1>
      <p>Page not found</p>
    </div>
  );
}

export { PageNotFound };
