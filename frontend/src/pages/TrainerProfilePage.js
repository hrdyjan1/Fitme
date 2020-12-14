import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { TrainerProfileTemplate } from 'src/templates';
import { useUser } from 'src/contexts/user';
import { useNotification } from 'src/contexts/notification';

const TRAINER_QUERY = gql`
  query Trainer($userid: String!) {
    trainer(uid: $userid) {
      ico
      firstName
      lastName
      email
      phoneNumber
      description
      tagList {
        id
        name
      }
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

const TRAINER_MUTATION = gql`
  mutation UpdateTrainer(
    $ico: String
    $email: String
    $phoneNumber: String
    $description: String
    $firstName: String
    $lastName: String
    $street: String
    $city: String
    $zipCode: String
    $country: String
  ) {
    updateTrainer(
      ico: $ico
      email: $email
      phoneNumber: $phoneNumber
      description: $description
      firstName: $firstName
      lastName: $lastName
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

function TrainerProfilePage() {
  const { user, setUser } = useUser();
  const { showMessage, showErrorMessage } = useNotification();
  const trainerFetcher = useQuery(TRAINER_QUERY, { variables: { userid: user.id } });
  const [
    profileImageMutationRequest,
    profileImageMutationRequestState,
  ] = useMutation(PROFILE_IMAGE_MUTATION);
  const [trainerMutationRequest, trainerMutationRequestState] = useMutation(
    TRAINER_MUTATION,
  );
  const [passwordMutationRequest, passwordMutationRequestState] = useMutation(
    PASSWORD_MUTATION,
  );

  const updateProfileImage = async (image) => {
    profileImageMutationRequest({ variables: { file: image } })
    .then((response) => {
      if (response.data) {
        showMessage('Profilová fotka byla úspěšně aktualizována..');
      } else {
        showErrorMessage(String(response.errors) || 'Profilová nebyla aktualizována.');
      }
    })
    .catch((error) => {
      showErrorMessage(String(error.message));
    });
  };

  const updateTrainer = async (values) => {
    trainerMutationRequest({ variables: values })
    .then((response) => {
      if (!values.street) {
        setUser(values);
      }
      if (response.data) {
        showMessage('Údaje byly úspěšně aktualizovány.');
      } else {
        showErrorMessage(String(response.errors) || 'Kontaktní údaje nebyly aktualizovány.');
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
    <TrainerProfileTemplate
      trainer={trainerFetcher.data?.trainer}
      trainerLoading={trainerMutationRequestState.loading}
      passwordLoading={passwordMutationRequestState.loading}
      profileImageLoading={profileImageMutationRequestState.loading}
      onSaveTrainer={updateTrainer}
      onSavePassword={updatePassword}
      onSaveProfileImage={updateProfileImage}
    />
  );
}

export { TrainerProfilePage };
