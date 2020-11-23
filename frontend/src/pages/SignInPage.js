import React from 'react';
import { gql, useMutation } from '@apollo/client';

import { useUser } from 'src/contexts/user';
import { print } from 'src/constants/functions/basic';

const SIGN_IN = gql`
  mutation SignInBackend($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
      user {
          firstName
          lastName
          email
      }
    }
  }
`;

function SignInPage() {
  const { login } = useUser();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [signInBackend] = useMutation(SIGN_IN);

  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);

  const onClick = () => {
    signInBackend({ variables: { email, password } }).then((r) => {
      const token = r.data?.signin?.token;
      const user = r.data?.signin?.user;
      if (token && user) {
        login(token, user);
      } else {
        print(r.errors || 'Chybi token nebo user.', true);
      }
    }).catch((e) => {
      print(e, true);
    });
  };

  return (
    <div>
      <input
        type="text"
        id="email"
        required
        value={email}
        onChange={changeEmail}
      />
      <input
        type="password"
        id="password"
        required
        value={password}
        onChange={changePassword}
      />
      <button type="button" onClick={onClick}>
        odeslat
      </button>
    </div>
  );
}

export { SignInPage };
