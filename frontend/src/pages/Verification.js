import React from 'react';
import { gql, useMutation } from '@apollo/client';
import {
  compose, head, match, substring,
} from 'src/constants/functions';

const VERIFY = gql`
  mutation verifyVoe($token: String!) {
    verify(token: $token)
  }
`;

const pickUpToken = compose(
  substring(1),
  head,
  match(/=(.+)/),
  head,
  match(/\/verificationToken=(.+)/),
);

function Verification({ token }) {
  const [verify, { data }] = useMutation(VERIFY);

  console.log(token);

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

export { Verification, pickUpToken };
