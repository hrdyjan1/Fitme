import React from 'react';
import { gql, useMutation } from '@apollo/client';
import {
  compose, match, print, stringAfterEqual,
} from 'src/constants/functions';

const VERIFY = gql`
  mutation verify($token: String!) {
    verify(token: $token)
  }
`;

const pickUpVerToken = compose(stringAfterEqual, match(/\/verificationToken=(.+)/));

function Verification({ token }) {
  const [verify, { data }] = useMutation(VERIFY);

  React.useEffect(() => {
    verify({ variables: { token } })
      .then((r) => {
        if (r.data) {
          print(r.data);
        }
        if (r.errors) {
          print(r.errors, true);
        }
      })
      .catch((e) => print(e, true));
  }, [token, verify]);

  if (data?.verify) {
    return <p>Overeno</p>;
  } if (data?.verify === false) {
    return <p>Uzivatel jiz overen nebo vase adresa jiz neni platna.</p>;
  }
  return <div />;
}

export { Verification, pickUpVerToken };
