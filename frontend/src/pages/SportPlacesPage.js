import React from 'react';
import { gql, useQuery } from '@apollo/client';

import { isFilledArray } from 'src/constants/array';
import Section from 'src/components/organisms/Section';
import SportPlaces from 'src/components/spec/SportPlaces';

const GET_PLACES = gql`
  query GetPlaces {
    places {
      uid
      name
      description
    }
  }
`;

function SportPlacesPage() {
  const { data } = useQuery(GET_PLACES);
  //change that null values can be queried...
  const places = isFilledArray(data?.places) ? data?.places : null;

  return (
    <div>
      {places && (
        <Section>
          <SportPlaces data={places} showAll />
        </Section>
      )}
    </div>
  );
}

export { SportPlacesPage };
