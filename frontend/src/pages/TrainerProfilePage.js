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
      sportTypeList {
        stid
        sportTypeName
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
  const { user } = useUser();
  const { showMessage, showErrorMessage } = useNotification();

  const trainer = {
    mutationRequest: (values) => trainerMutationRequest({ variables: values }),
    onCompleted: () => showMessage('Základní informace byly aktualizovány.'),
    onError: (error) => showErrorMessage(error.message),
  };

  const password = {
    mutationRequest: (values) =>
      passwordMutationRequest({ variables: { ...values } }),
    onCompleted: () => showMessage('Heslo bylo změněno.'),
    onError: (error) => showErrorMessage(error.message),
  };

  const profileImage = {
    mutationRequest: (image) =>
      profileImageMutationRequest({ variables: { file: image } }),
    onCompleted: () =>
      showMessage('Profilová fotka byla úspěšně aktualizována.'),
    onError: (error) => showErrorMessage(error.message),
  };

  const trainerFetcher = useQuery(TRAINER_QUERY, {
    variables: { userid: user.id },
  });

  const [trainerMutationRequest, trainerMutationRequestState] = useMutation(
    TRAINER_MUTATION,
    {
      onCompleted: trainer.onCompleted,
      onError: trainer.onError,
    }
  );

  const [passwordMutationRequest, passwordMutationRequestState] = useMutation(
    PASSWORD_MUTATION,
    {
      onCompleted: password.onCompleted,
      onError: password.onError,
    }
  );

  const [
    profileImageMutationRequest,
    profileImageMutationRequestState,
  ] = useMutation(PROFILE_IMAGE_MUTATION, {
    onCompleted: profileImage.onCompleted,
    onError: profileImage.onError,
  });

  return (
    <TrainerProfileTemplate
      trainer={trainerFetcher.data?.trainer}
      reFetchTrainer={trainerFetcher.refetch}
      trainerLoading={trainerMutationRequestState.loading}
      passwordLoading={passwordMutationRequestState.loading}
      profileImageLoading={profileImageMutationRequestState.loading}
      onSaveTrainer={trainer.mutationRequest}
      onSavePassword={password.mutationRequest}
      onSaveProfileImage={profileImage.mutationRequest}
    />
  );
}

export { TrainerProfilePage };
