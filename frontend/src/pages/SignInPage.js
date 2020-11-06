import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useAuth } from 'src/utils/auth';
import { useUser } from 'src/contexts/user';

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
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
  const { setUser } = useUser();
  const { signin: localSignIn } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [outsideSignIn] = useMutation(SIGN_IN);

  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);

  const onClick = () => {
    outsideSignIn({ variables: { email, password } }).then((r) => {
      const token = r.data?.signin?.token;
      const user = r.data?.signin?.user;
      if (token) {
        setUser(user);
        localSignIn({ token });
      } else {
        console.warn(r.errors || 'Chybi token voe.');
      }
    }).catch((e) => {
      console.warn(e);
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
