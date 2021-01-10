import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { PlaceProfileTemplate } from 'src/templates';
import { useUser } from 'src/contexts/user';
import { useNotification } from 'src/contexts/notification';

const PLACE_QUERY = gql`
  query Place($userid: String!) {
    place(uid: $userid) {
      id
      firstName
      lastName  
      name
      phoneNumber
      ico
      pictureList {
        iid        
        imageURL
      }
      sportTypeList {
        stid
        sportTypeName
      }
      description
      city
      street
      zipCode
      country
      email
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

const PLACE_SPORT_TYPES_QUERY = gql`
  query UserSportTypes {
    userSportTypes {
      stid
      sportTypeName
    }
  }
`;

const TRAINERS_QUERY = gql`
  query AllTrainers {
    allTrainers {
      id
      firstName
      lastName
      description
      imageURL
    }
  }
`;

const PLACE_TRAINERS_QUERY = gql`
  query PlaceTrainers {
    placeTrainers {
      id
      firstName
      lastName
      description
      imageURL
    }
  }
`;

const PLACE_BASICS_MUTATION = gql`
  mutation UpdatePlaceBasics(
    $id: String!
    $uid: String!
    $firstName: String
    $lastName: String
    $name: String
    $ico: String
    $email: String
    $phoneNumber: String
    $description: String
    $street: String
    $city: String
    $zipCode: String
    $country: String
  ) {
    updatePlaceBasics(
      id: $id
      uid: $uid
      firstName: $firstName
      lastName: $lastName
      name: $name
      ico: $ico
      email: $email
      phoneNumber: $phoneNumber
      description: $description
      street: $street
      city: $city
      zipCode: $zipCode
      country: $country
    )
  }
`;

const UPLOAD_IMAGE_MUTATION = gql`
  mutation UploadPlaceImage($file: String!) {
    uploadPlaceImage(file: $file)
  }
`;

const DELETE_IMAGE_MUTATION = gql`
  mutation DeletePlaceImage($iid: Int!) {
    deletePlaceImage(iid: $iid)
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

const ADD_TRAINER_MUTATION = gql`
  mutation AddTrainer($tid: String!) {
    addTrainer(tid: $tid)
  }
`;

const DELETE_TRAINER_MUTATION = gql`
  mutation RemoveTrainer($tid: String!) {
    removeTrainer(tid: $tid)
  }
`;

const PASSWORD_MUTATION = gql`
  mutation UpdatePassword($oldPassword: String!, $newPassword: String!) {
    updatePassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;

function PlaceProfilePage() {
  const { user } = useUser();
  const { showMessage, showErrorMessage } = useNotification();

  const placeFetcher = useQuery(PLACE_QUERY, { variables: { userid: user.id } });
  const sportTypesFetcher = useQuery(SPORT_TYPES_QUERY);
  const placeSportTypesFetcher = useQuery(PLACE_SPORT_TYPES_QUERY);
  const trainersFetcher = useQuery(TRAINERS_QUERY);
  const placeTrainersFetcher = useQuery(PLACE_TRAINERS_QUERY);

  const place = {
    mutationRequest: (values) => placeMutationRequest({ variables: {
      id: placeFetcher.data.place.id,
      uid: user.id,
      ...values
    }}),
    onCompleted: () => showMessage('Základní informace byly aktualizovány.'),
    onError: (error) => showErrorMessage(error.message)
  }

  const password = {
    mutationRequest: (values) => passwordMutationRequest({ variables: { ...values } }),
    onCompleted: (data) => data?.updatePassword
      ? showMessage('Heslo bylo změněno.')
      : showErrorMessage('Heslo se nepodařilo změnit.'),
    onError: (error) => showErrorMessage(error.message)
  }

  const placeImage = {
    uploadMutationRequest: (image) => uploadPlaceImageMutationRequest({ variables: { file: image } }),
    deleteMutationRequest: (id) => deletePlaceImageMutationRequest({ variables: { iid: id } }),
    onUploadCompleted: (data) => data?.uploadPlaceImage
      ? showMessage('Fotka sportoviště byla úspěšně uložena.')
      : showErrorMessage('Fotku sportoviště se nepodařilo uložit.'),
    onDeleteCompleted: (data) => data?.deletePlaceImage
      ? showMessage('Fotka sportoviště byla úspěšně odstraněna.')
      : showErrorMessage('Fotku sportoviště se nepodařilo odstranit.'),
    onError: (error) => showErrorMessage(error.message),
  }

  const sportType = {
    addMutationRequest: (id) => addSportTypeMutationRequest({ variables: { stid: id } }),
    deleteMutationRequest: (id) => deleteSportTypeMutationRequest({ variables: { stid: id } }),
    onAddCompleted: (data) => data?.addSportType
      ? showMessage('Disciplína sportoviště byla úspěšně přidána.')
      : showErrorMessage('Disciplínu sportoviště se nepodařilo přidat.'),
    onDeleteCompleted: (data) => data?.deleteSportType
      ? showMessage('Disciplína sportoviště byla úspěšně odebrána.')
      : showErrorMessage('Disciplínu sportoviště se nepodařilo odebrat.'),
    onError: (error) => showErrorMessage(error.message),
  }

  const placeTrainer = {
    addMutationRequest: (id) => addPlaceTrainerMutationRequest({ variables: { tid: id } }),
    deleteMutationRequest: (id) => deleteTrainerMutationRequest({ variables: { tid: id } }),
    onAddCompleted: (data) => data?.addTrainer
      ? showMessage('Trenér byl úspěšně přidán.')
      : showErrorMessage('Trenéra se nepodařilo přidat.'),
    onDeleteCompleted: (data) => data?.deleteTrainer
      ? showMessage('Trenér byl úspěšně odebrán.')
      : showErrorMessage('Trenéra se nepodařilo odebrat.'),
    onError: (error) => showErrorMessage(error.message),
  }

  const [placeMutationRequest, placeMutationRequestState] = useMutation(
    PLACE_BASICS_MUTATION,{
      onCompleted: place.onCompleted,
      onError: place.onError
    }
  );

  const [passwordMutationRequest, passwordMutationRequestState] = useMutation(
    PASSWORD_MUTATION,{
      onCompleted: password.onCompleted,
      onError: password.onError
    }
  );

  const [uploadPlaceImageMutationRequest, uploadPlaceImageMutationRequestState] = useMutation(
    UPLOAD_IMAGE_MUTATION,{
      onCompleted: placeImage.onUploadCompleted,
      onError: placeImage.onError
    });

  const [deletePlaceImageMutationRequest, deletePlaceImageMutationRequestState] = useMutation(
    DELETE_IMAGE_MUTATION,{
      onCompleted: placeImage.onDeleteCompleted,
      onError: placeImage.onError
    });

  const [addSportTypeMutationRequest, addSportTypeMutationRequestState] = useMutation(
    ADD_SPORT_TYPE_MUTATION,{
      onCompleted: sportType.onAddCompleted,
      onError: sportType.onError
    });

  const [deleteSportTypeMutationRequest, deleteSportTypeMutationRequestState] = useMutation(
    DELETE_SPORT_TYPE_MUTATION,{
      onCompleted: sportType.onDeleteCompleted,
      onError: sportType.onError
    });

  const [addPlaceTrainerMutationRequest, addPlaceTrainerMutationRequestState] = useMutation(
    ADD_TRAINER_MUTATION,{
      onCompleted: placeTrainer.onAddCompleted,
      onError: placeTrainer.onError
    });

  const [deleteTrainerMutationRequest, deletePlaceTrainerMutationRequestState] = useMutation(
    DELETE_TRAINER_MUTATION,{
      onCompleted: placeTrainer.onDeleteCompleted,
      onError: placeTrainer.onError
    });

  return (
    <PlaceProfileTemplate
      place={placeFetcher.data?.place}
      sportTypes={sportTypesFetcher.data?.allSportTypes}
      placeSportTypes={placeSportTypesFetcher.data?.userSportTypes}
      trainers={trainersFetcher.data?.allTrainers}
      placeTrainers={placeTrainersFetcher.data?.placeTrainers}
      reFetchPlace={placeFetcher.refetch}
      reFetchPlaceSportTypes={placeSportTypesFetcher.refetch}
      reFetchPlaceTrainers={placeTrainersFetcher.refetch}
      placeLoading={placeMutationRequestState.loading}
      passwordLoading={passwordMutationRequestState.loading}
      uploadPlaceImageLoading={uploadPlaceImageMutationRequestState.loading}
      deletePlaceImageLoading={deletePlaceImageMutationRequestState.loading}
      addSportTypeLoading={addSportTypeMutationRequestState.loading}
      deleteSportTypeLoading={deleteSportTypeMutationRequestState.loading}
      addPlaceTrainerLoading={addPlaceTrainerMutationRequestState.loading}
      deletePlaceTrainerLoading={deletePlaceTrainerMutationRequestState.loading}
      onSavePlace={place.mutationRequest}
      onSavePassword={password.mutationRequest}
      onSavePlaceImage={placeImage.uploadMutationRequest}
      onDeletePlaceImage={placeImage.deleteMutationRequest}
      onSaveSportType={sportType.addMutationRequest}
      onDeleteSportType={sportType.deleteMutationRequest}
      onSavePlaceTrainer={placeTrainer.addMutationRequest}
      onDeletePlaceTrainer={placeTrainer.deleteMutationRequest}
    />
  );
}

export { PlaceProfilePage };
