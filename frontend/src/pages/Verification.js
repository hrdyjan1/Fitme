import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Box } from '@material-ui/core';
import {
  compose,
  match,
  print,
  stringAfterEqual,
} from 'src/constants/functions';

const VERIFY = gql`
  mutation verify($token: String!) {
    verify(token: $token)
  }
`;

const pickUpVerToken = compose(
  stringAfterEqual,
  match(/\/verificationToken=(.+)/),
);

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
    return (
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-evenly"
        marginTop="80px"
      >
        <p>Váš účet pro aplikaci Fit.me byl úspěšně ověřen.</p>
      </Box>
    );
  }
  if (data?.verify === false) {
    return (
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-evenly"
        marginTop="80px"
      >
        <p>Uživatel již ověřen nebo vaše adresa již není platná.</p>
      </Box>
    );
  }
  return <div />;
}

export { Verification, pickUpVerToken };
