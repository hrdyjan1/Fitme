import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useUser } from 'src/contexts/user';
import { useNotification } from 'src/contexts/notification';
import { TrainerProfileTemplate } from 'src/templates';

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

const SPORT_TYPES_QUERY = gql`
  query AllSportTypes {
    allSportTypes {
      stid
      sportTypeName
    }
  }
`;

const TRAINER_SPORT_TYPES_QUERY = gql`
  query UserSportTypes {
    userSportTypes {
      stid
      sportTypeName
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

const ADD_SPORT_TYPE_MUTATION = gql`
  mutation AddSportType($stid: Int!) {
    addSportType(stid: $stid)
  }
`;

const DELETE_SPORT_TYPE_MUTATION = gql`
  mutation RemoveSportType($stid: Int!) {
    removeSportType(stid: $stid)
  }
`;

function TrainerProfilePage() {
  const { user } = useUser();
  const { showMessage, showErrorMessage } = useNotification();

  const trainerFetcher = useQuery(TRAINER_QUERY, { variables: { userid: user.id } });
  const sportTypesFetcher = useQuery(SPORT_TYPES_QUERY);
  const trainerSportTypesFetcher = useQuery(TRAINER_SPORT_TYPES_QUERY);

  const trainer = {
    mutationRequest: (values) => trainerMutationRequest({ variables: values }),
    onCompleted: () => showMessage('Základní informace byly aktualizovány.'),
    onError: (error) => showErrorMessage(error.message),
  };

  const password = {
    mutationRequest: (values) => passwordMutationRequest({ variables: { ...values } }),
    onCompleted: () => showMessage('Heslo bylo změněno.'),
    onError: (error) => showErrorMessage(error.message),
  };

  const profileImage = {
    mutationRequest: (image) => profileImageMutationRequest({ variables: { file: image } }),
    onCompleted: () => showMessage('Profilová fotka byla úspěšně aktualizována.'),
    onError: (error) => showErrorMessage(error.message),
  };

  const sportType = {
    addMutationRequest: (id) => addSportTypeMutationRequest({ variables: { stid: id } }),
    deleteMutationRequest: (id) => deleteSportTypeMutationRequest({ variables: { stid: id } }),
    onAddCompleted: (data) => (data?.addSportType
      ? showMessage('Disciplína byla úspěšně přidána.')
      : showErrorMessage('Disciplínu se nepodařilo přidat.')),
    onDeleteCompleted: (data) => (data?.removeSportType
      ? showMessage('Disciplína byla úspěšně odebrána.')
      : showErrorMessage('Disciplínu se nepodařilo odebrat.')),
    onError: (error) => showErrorMessage(error.message),
  };

  const [trainerMutationRequest, trainerMutationRequestState] = useMutation(
    TRAINER_MUTATION,
    {
      onCompleted: trainer.onCompleted,
      onError: trainer.onError,
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

  const [
    addSportTypeMutationRequest,
    addSportTypeMutationRequestState,
  ] = useMutation(ADD_SPORT_TYPE_MUTATION, {
    onCompleted: sportType.onAddCompleted,
    onError: sportType.onError,
  });

  const [
    deleteSportTypeMutationRequest,
    deleteSportTypeMutationRequestState,
  ] = useMutation(DELETE_SPORT_TYPE_MUTATION, {
    onCompleted: sportType.onDeleteCompleted,
    onError: sportType.onError,
  });

  return (
    <TrainerProfileTemplate
      trainer={trainerFetcher.data?.trainer}
      sportTypes={sportTypesFetcher.data?.allSportTypes}
      trainerSportTypes={trainerSportTypesFetcher.data?.userSportTypes}
      reFetchTrainer={trainerFetcher.refetch}
      reFetchTrainerSportTypes={trainerSportTypesFetcher.refetch}
      trainerLoading={trainerMutationRequestState.loading}
      passwordLoading={passwordMutationRequestState.loading}
      profileImageLoading={profileImageMutationRequestState.loading}
      addSportTypeLoading={addSportTypeMutationRequestState.loading}
      deleteSportTypeLoading={deleteSportTypeMutationRequestState.loading}
      onSaveTrainer={trainer.mutationRequest}
      onSavePassword={password.mutationRequest}
      onSaveProfileImage={profileImage.mutationRequest}
      onSaveSportType={sportType.addMutationRequest}
      onDeleteSportType={sportType.deleteMutationRequest}
    />
  );
}

export { TrainerProfilePage };
