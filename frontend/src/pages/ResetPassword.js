import React from 'react';
import { gql, useMutation } from '@apollo/client';
import {
  compose,
  match,
  print,
  stringAfterEqual,
} from 'src/constants/functions';

const CHANGE_PASSWORD = gql`
  mutation changeForgotPass($lockedToken: String!, $password: String!) {
    changeForgotPass(lockedToken: $lockedToken, password: $password)
  }
`;

const pickUpLockToken = compose(stringAfterEqual, match(/\/lockedToken=(.+)/));

function ResetPassword({ token }) {
  const [password, setPassword] = React.useState('');
  const [rePassword, seRePassword] = React.useState('');

  const changePassword = (e) => setPassword(e.target.value);
  const changeRePassword = (e) => seRePassword(e.target.value);

  const [resetPassword, { loading }] = useMutation(CHANGE_PASSWORD);

  const onClick = () => {
    resetPassword({ variables: { lockedToken: token, password } })
      .then((r) => {
        if (r.data) {
          print(r.data);
        }
        if (r.errors) {
          print(r.errors, true);
        }
      })
      .catch((e) => print(e, true));
  };

  return (
    <div>
      <input
        type="password"
        id="password"
        required
        value={password}
        onChange={changePassword}
      />
      <input
        type="password"
        id="rePassword"
        required
        value={rePassword}
        onChange={changeRePassword}
      />
      <button type="button" onClick={onClick} disabled={loading}>
        odeslat
      </button>
    </div>
  );
}

export { ResetPassword, pickUpLockToken };
