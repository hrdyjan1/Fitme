import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { PlaceProfileTemplate } from 'src/templates';
import { useUser } from 'src/contexts/user';
import { useNotification } from 'src/contexts/notification';

const PLACE_QUERY = gql`
  query Place($userid: String!) {
    place(uid: $userid) {
      id  
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
      email
    }
  }
`;

const PROFILE_IMAGE_MUTATION = gql`
  mutation UploadProfileImage($file: String!) {
    uploadProfileImage(file: $file)
  }
`;

const PLACE_MUTATION = gql`
  mutation UpdatePlace(
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
    updatePlace(
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

function PlaceProfilePage() {
  const { user } = useUser();
  const { showMessage, showErrorMessage } = useNotification();

  const place = {
    mutationRequest: (values) => placeMutationRequest({ variables: values }),
    onCompleted: () => showMessage('Základní informace byly aktualizovány.'),
    onError: (error) => showErrorMessage(error.message)
  }

  const password = {
    mutationRequest: (values) => passwordMutationRequest({ variables: { ...values } }),
    onCompleted: () => showMessage('Heslo bylo změněno.'),
    onError: (error) => showErrorMessage(error.message)
  }

  const profileImage = {
    mutationRequest: (image) => profileImageMutationRequest({ variables: { file: image } }),
    onCompleted: () => showMessage('Profilová fotka byla úspěšně aktualizována.'),
    onError: (error) => showErrorMessage(error.message)
  }

  const placeFetcher = useQuery(PLACE_QUERY, { variables: { userid: user.id } });

  const [placeMutationRequest, placeMutationRequestState] = useMutation(
    PLACE_MUTATION,{
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

  const [profileImageMutationRequest, profileImageMutationRequestState] = useMutation(
    PROFILE_IMAGE_MUTATION,{
      onCompleted: profileImage.onCompleted,
      onError: profileImage.onError
    });

  return (
    <PlaceProfileTemplate
      place={placeFetcher.data?.place}
      reFetchPlace={placeFetcher.refetch}
      placeLoading={placeMutationRequestState.loading}
      passwordLoading={passwordMutationRequestState.loading}
      profileImageLoading={profileImageMutationRequestState.loading}
      onSavePlace={place.mutationRequest}
      onSavePassword={password.mutationRequest}
      onSaveProfileImage={profileImage.mutationRequest}
    />
  );
}

export { PlaceProfilePage };
