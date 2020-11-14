import React from 'react'
import { UserProfileTemplate } from 'src/templates'
import { useUser } from 'src/contexts/user'
import {useAuth} from '../utils/auth'
import {gql, useMutation} from '@apollo/client'

const USER_MUTATION = gql`
  mutation UpdateUser(
    $token: String!,
    $id: Int!,
    $nickname: String,
    $firstname: String,
    $lastname: String,
    $email: String,
    $phone: String,
    $street: String,
    $city: String,
    $zip: String,
    $country: String
    ) {
    updateUser(
      token: $token,
      id: $id,
      nickname: $nickname,
      firstname: $firstname
      lastname: $lastname,
      email: $email,
      phone: $phone,
      street: $street,
      city: $city,
      zip: $zip,
      country: $country
    )
  }
`;

const PASSWORD_MUTATION = gql`
  mutation UpdateUser($token: String!, $id: Int!, $oldPassword: String!, $newPassword: String!) {
    updateUser(token: $token, id: $id, oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;

function UserProfilePage() {
  const { user, setUser } = useUser();
  const { token } = useAuth();

  const [ userMutationRequest, userMutationRequestState] = useMutation(USER_MUTATION);
  const [ passwordMutationRequest, passwordMutationRequestState] = useMutation(PASSWORD_MUTATION);

  const updateUser = async (values) => {
    userMutationRequest({ variables: {token: token, ...values} })
    .then(response => {
      setUser(values)
      if (response.data) {
        alert('Údaje byly úspěšně aktualizovány.');
      } else {
        alert(response.errors || 'Kontaktní údaje nebyly aktualizovány.');
      }
    })
    .catch((error) => {
      alert(error);
    });
  };

  const updatePassword = async (values) => {
    passwordMutationRequest({ variables: {token: token, ...values} })
    .then(response => {
      if (response.data) {
        alert('Heslo bylo změněno.');
      } else {
        alert(response.errors || 'Heslo nebylo změněno.');
      }
    })
    .catch((error) => {
      alert(error);
    });
  };

  return <UserProfileTemplate
    user={user}
    userError={userMutationRequestState.error}
    userLoading={userMutationRequestState.loading}
    passwordError={userMutationRequestState.error}
    passwordLoading={userMutationRequestState.loading}
    onSaveUser={updateUser}
    onSavePassword={updatePassword}
  />
}

export { UserProfilePage };
