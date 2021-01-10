import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { UserProfileTemplate } from 'src/templates';
import { useUser } from 'src/contexts/user';
import { useNotification } from 'src/contexts/notification';

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

const PROFILE_IMAGE_MUTATION = gql`
  mutation UploadProfileImage($file: String!) {
    uploadProfileImage(file: $file)
  }
`;

const USER_MUTATION = gql`
  mutation UpdateUser(
    $nickname: String
    $firstName: String
    $lastName: String
    $email: String
    $phoneNumber: String
    $street: String
    $city: String
    $zipCode: String
    $country: String
  ) {
    updateUser(
      nickname: $nickname
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
      street: $street
      city: $city
      zipCode: $zipCode
      country: $country
    )
  }
`;

const PASSWORD_MUTATION = gql`
  mutation UpdatePassword($oldPassword: String!, $newPassword: String!) {
    updatePassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;

function UserProfilePage() {
  const { setUser } = useUser();
  const { showMessage, showErrorMessage } = useNotification();
  const userFetcher = useQuery(USER_QUERY);
  const [
    profileImageMutationRequest,
    profileImageMutationRequestState,
  ] = useMutation(PROFILE_IMAGE_MUTATION);
  const [userMutationRequest, userMutationRequestState] = useMutation(
    USER_MUTATION
  );
  const [passwordMutationRequest, passwordMutationRequestState] = useMutation(
    PASSWORD_MUTATION
  );

  const updateProfileImage = async (image) => {
    profileImageMutationRequest({ variables: { file: image } })
      .then((response) => {
        if (response.data) {
          showMessage('Profilová fotka byla úspěšně aktualizována..');
        } else {
          showErrorMessage(
            String(response.errors) || 'Profilová nebyla aktualizována.'
          );
        }
      })
      .catch((error) => {
        showErrorMessage(String(error.message));
      });
  };

  const updateUser = async (values) => {
    userMutationRequest({ variables: values })
      .then((response) => {
        if (!values.street) {
          setUser(values);
        }
        if (response.data) {
          showMessage('Údaje byly úspěšně aktualizovány.');
        } else {
          showErrorMessage(
            String(response.errors) || 'Kontaktní údaje nebyly aktualizovány.'
          );
        }
      })
      .catch((error) => {
        showErrorMessage(String(error.message));
      });
  };

  const updatePassword = async (values) => {
    passwordMutationRequest({ variables: { ...values } })
      .then((response) => {
        if (response.data) {
          showMessage('Heslo bylo změněno.');
        } else {
          showErrorMessage(String(response.errors) || 'Heslo nebylo změněno.');
        }
      })
      .catch((error) => {
        showErrorMessage(error.message);
      });
  };

  return (
    <UserProfileTemplate
      user={userFetcher.data?.user}
      userLoading={userMutationRequestState.loading}
      passwordLoading={passwordMutationRequestState.loading}
      profileImageLoading={profileImageMutationRequestState.loading}
      onSaveUser={updateUser}
      onSavePassword={updatePassword}
      onSaveProfileImage={updateProfileImage}
    />
  );
}

export { UserProfilePage };
