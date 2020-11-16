import React from 'react'
import {gql, useMutation, useQuery} from '@apollo/client'
import { UserProfileTemplate } from 'src/templates'
import { useUser } from 'src/contexts/user'

const USER_QUERY = gql`
  query User {
    user {
      nickname
      firstName
      lastName
      email
      phoneNumber
      street
      city
      zipCode
      country
      imageURL
    }
  }
`;

const USER_MUTATION = gql`
  mutation UpdateUser(
      $nickname: String,
      $firstName: String,
      $lastName: String,
      $email: String,
      $phoneNumber: String,
      $street: String,
      $city: String,
      $zipCode: String,
      $country: String,
    ) {
    updateUser(
      nickname: $nickname,
      firstName: $firstName,
      lastName: $lastName,
      email: $email,
      phoneNumber: $phoneNumber,
      street: $street,
      city: $city,
      zipCode: $zipCode,
      country: $country
    )
  }
`;

const PASSWORD_MUTATION = gql`
  mutation UpdateUser($token: String!, $id: Int!, $password: String!, $newPassword: String!) {
    updateUser(token: $token, id: $id, password: $password, newPassword: $newPassword)
  }
`;

function UserProfilePage() {
  const { setUser } = useUser();

  const userState = useQuery(USER_QUERY);
  const [ userMutationRequest, userMutationRequestState] = useMutation(USER_MUTATION);
  const [ passwordMutationRequest, passwordMutationRequestState] = useMutation(PASSWORD_MUTATION);

  const updateUser = async (values) => {
    userMutationRequest({ variables: values })
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
    passwordMutationRequest({ variables: values })
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
    user={userState.data?.user}
    userError={userMutationRequestState.error}
    userLoading={userMutationRequestState.loading}
    passwordError={passwordMutationRequestState.error}
    passwordLoading={passwordMutationRequestState.loading}
    onSaveUser={updateUser}
    onSavePassword={updatePassword}
  />
}

export { UserProfilePage };
