import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { UserProfileTemplate } from 'src/templates';
import { useUser } from 'src/contexts/user';
import { useNotification } from 'src/contexts/notification';

const USER_QUERY = gql`
  query User {
    user {
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
  const { user, setUser } = useUser();
  const { showMessage, showErrorMessage } = useNotification();

  const userFetcher = useQuery(USER_QUERY);

  const beUser = {
    mutationRequest: (values) => userMutationRequest({ variables: values }),
    onCompleted: (data) => {
      if (data?.updateUser) {
        showMessage('Základní informace byly úspěšně aktualizovány.');
      } else {
        showErrorMessage('Základní informace se nepodařilo aktualizovat');
      }
    },
    onError: (error) => showErrorMessage(error.message),
  };

  const password = {
    mutationRequest: (values) => passwordMutationRequest({ variables: { ...values } }),
    onCompleted: (data) => (data?.updatePassword
      ? showMessage('Heslo bylo změněno.')
      : showErrorMessage('Heslo se nepodařilo změnit.')),
    onError: (error) => showErrorMessage(error.message),
  };

  const profileImage = {
    mutationRequest: (image) => profileImageMutationRequest({ variables: { file: image } }),
    onCompleted: (data) => (data?.uploadProfileImage
      ? showMessage('Profilová fotka byla úspěšně uložena.')
      : showErrorMessage('Profilovou fotku se nepodařilo uložit.')),
    onError: (error) => showErrorMessage(error.message),
  };

  const [userMutationRequest, userMutationRequestState] = useMutation(
    USER_MUTATION,
    {
      onCompleted: beUser.onCompleted,
      onError: beUser.onError,
    },
  );

  const [passwordMutationRequest, passwordMutationRequestState] = useMutation(
    PASSWORD_MUTATION,
    {
      onCompleted: password.onCompleted,
      onError: password.onError,
    },
  );

  const [
    profileImageMutationRequest,
    profileImageMutationRequestState,
  ] = useMutation(PROFILE_IMAGE_MUTATION, {
    onCompleted: profileImage.onCompleted,
    onError: profileImage.onError,
  });

  const onSaveUser = (values) => {
    beUser.mutationRequest(values).then(() =>{
      setUser(values)
    })
  }

  return (
    <UserProfileTemplate
      user={userFetcher.data?.user}
      userLoading={userMutationRequestState.loading}
      reFetchUser={userFetcher.refetch}
      passwordLoading={passwordMutationRequestState.loading}
      profileImageLoading={profileImageMutationRequestState.loading}
      onSaveUser={onSaveUser}
      onSavePassword={password.mutationRequest}
      onSaveProfileImage={profileImage.mutationRequest}
    />
  );
}

export { UserProfilePage };
