import React from 'react';
import { gql, useQuery } from '@apollo/client';

import { isFilledArray } from 'src/constants/array';
import Section from 'src/components/organisms/Section';
import SportPlaces from 'src/components/spec/SportPlaces';

const GET_PLACES = gql`
  query GetPlaces {
    places {
      id
      name
      description
    }
  }
`;

function SportPlacesPage() {
  const { data } = useQuery(GET_PLACES);
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
