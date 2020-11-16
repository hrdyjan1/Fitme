import React from 'react';
import { UserProfileTemplate } from 'src/templates';
import { useUser } from 'src/contexts/user';
import { gql, useMutation } from '@apollo/client';
import { print, showMessage } from 'src/constants/functions';

const USER_MUTATION = gql`
  mutation UpdateUser(
    $nickname: String
    $firstName: String
    $lastName: String
    $email: String
    $street: String
    $city: String
    $country: String
    $zipCode: String
    $phoneNumber: String
  ) {
    updateUser(
      email: $email
      nickname: $nickname
      firstName: $firstName
      lastName: $lastName
      street: $street
      city: $city
      country: $country
      zipCode: $zipCode
      phoneNumber: $phoneNumber
    )
  }
`;

const PASSWORD_MUTATION = gql`
  mutation UpdatePassword($oldPassword: String!, $newPassword: String!) {
    updatePassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;

const UPLOAD_PROFILE_IMAGE = gql`
  mutation UploadProfileImage($file: String!) {
    uploadProfileImage(file: $file)
  }
`;

function UserProfilePage() {
  const { user, setUser } = useUser();

  const [userMutationRequest, userMutationRequestState] = useMutation(
    USER_MUTATION,
  );
  const [passwordMutationRequest, passwordMutationRequestState] = useMutation(
    PASSWORD_MUTATION,
  );
  const [imageMutationRequest, imageMutationRequestState] = useMutation(UPLOAD_PROFILE_IMAGE);

  const updateUser = async (values) => {
    userMutationRequest({ variables: values })
      .then((response) => {
        setUser(values);
        if (response.data) {
          showMessage('Údaje byly úspěšně aktualizovány.');
        } else {
          showMessage(response.errors || 'Kontaktní údaje nebyly aktualizovány.');
        }
      })
      .catch((error) => {
        showMessage(error);
      });
  };

  const updatePassword = async (values) => {
    passwordMutationRequest({ variables: { ...values } })
      .then((response) => {
        if (response.data) {
          showMessage('Heslo bylo změněno.');
        } else {
          showMessage(response.errors || 'Heslo nebylo změněno.');
        }
      })
      .catch((error) => {
        showMessage(error);
      });
  };

  const uploadImage = (imageSource) => {
    try {
      imageMutationRequest({ variables: { file: imageSource } }).then(
        () => showMessage('Uspesne nahrani fotografie'),
        () => showMessage('Zvolte prosim jiny soubor'),
      );
    } catch (error) {
      print(error, true);
    }
  };

  return (
    <UserProfileTemplate
      user={user}
      userError={userMutationRequestState.error}
      userLoading={userMutationRequestState.loading}
      passwordError={passwordMutationRequestState.error}
      passwordLoading={passwordMutationRequestState.loading}
      imageError={imageMutationRequestState.error}
      imageLoading={imageMutationRequestState.loading}
      onSaveUser={updateUser}
      onSavePassword={updatePassword}
      onSaveImage={uploadImage}
    />
  );
}

export { UserProfilePage };
