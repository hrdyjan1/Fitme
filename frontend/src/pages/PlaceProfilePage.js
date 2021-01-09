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
      tagList {
          id
          name
      }
      description
      latitude
      longitude
      city
      street
      zipCode
      country
      email
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
    $latitude: String
    $longitude: String
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
      latitude: $latitude
      longitude: $longitude
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
  mutation DeletePlaceImage($iid: String!) {
    deletePlaceImage(iid: $iid)
  }
`;

const ADD_TAG_MUTATION = gql`
  mutation AddTag($name: String!) {
    addTag(name: $name)
  }
`;

const DELETE_TAG_MUTATION = gql`
  mutation DeleteTag($name: String!) {
    deleteTag(name: $name)
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
    onCompleted: () => showMessage('Heslo bylo změněno.'),
    onError: (error) => showErrorMessage(error.message)
  }

  const placeImage = {
    uploadMutationRequest: (image) => uploadPlaceImageMutationRequest({ variables: { file: image } }),
    deleteMutationRequest: (id) => deletePlaceImageMutationRequest({ variables: { iid: id } }),
    onUploadCompleted: () => showMessage('Fotka sportoviště byla úspěšně uložena.'),
    onDeleteCompleted: () => showMessage('Fotka sportoviště byla úspěšně odstraněna.'),
    onError: (error) => showErrorMessage(error.message),
  }

  const tag = {
    addMutationRequest: (tag) => addTagMutationRequest({ variables: { name: tag } }),
    deleteMutationRequest: (tag) => deleteTagMutationRequest({ variables: { name: tag } }),
    onAddCompleted: () => showMessage('Disciplína sportoviště byla úspěšně přidána.'),
    onDeleteCompleted: () => showMessage('Disciplína sportoviště byla úspěšně odebrána.'),
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

  const [addTagMutationRequest, addTagMutationRequestState] = useMutation(
    ADD_TAG_MUTATION,{
      onCompleted: tag.onAddCompleted,
      onError: tag.onError
    });

  const [deleteTagMutationRequest, deleteTagMutationRequestState] = useMutation(
    DELETE_TAG_MUTATION,{
      onCompleted: tag.onDeleteCompleted,
      onError: tag.onError
    });

  return (
    <PlaceProfileTemplate
      place={placeFetcher.data?.place}
      reFetchPlace={placeFetcher.refetch}
      placeLoading={placeMutationRequestState.loading}
      passwordLoading={passwordMutationRequestState.loading}
      uploadPlaceImageLoading={uploadPlaceImageMutationRequestState.loading}
      deletePlaceImageLoading={deletePlaceImageMutationRequestState.loading}
      addTagLoading={addTagMutationRequestState.loading}
      deleteTagLoading={deleteTagMutationRequestState.loading}
      onSavePlace={place.mutationRequest}
      onSavePassword={password.mutationRequest}
      onSavePlaceImage={placeImage.uploadMutationRequest}
      onDeletePlaceImage={placeImage.deleteMutationRequest}
      onSaveTag={tag.addMutationRequest}
      onDeleteTag={tag.deleteMutationRequest}
    />
  );
}

export { PlaceProfilePage };
