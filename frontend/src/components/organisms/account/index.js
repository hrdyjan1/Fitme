/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { gql, useQuery } from '@apollo/client';

import { useNotification } from 'src/contexts/notification';
import { useUser } from 'src/contexts/user';
import { Template } from 'src/components/organisms/account/Template';

const PLACE_DETAIL = gql`
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
      sportTypeList {
        stid
        sportTypeName
      }
      description
      zipCode
      country
      city
      street
      email
    }
  }
`;

const Account = () => {
  const { user } = useUser();
  const { showErrorMessage } = useNotification();
  const { loading, error, data } = useQuery(PLACE_DETAIL, {
    variables: { userid: user.id },
  });

  if (loading) {
    return null;
  }
  if (error || !data?.place) {
    showErrorMessage(error?.message || 'Chyba při načítání stránky');
    return null;
  }

  return <Template place={data?.place} />;
};

export default Account;
