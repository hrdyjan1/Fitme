import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { isFilledArray } from 'src/constants/array';

const GET_PLACES = gql`
  query GetPlaces {
    places {
      id
      name
      description
    }
  }
`;

export function HomePage() {
  const { data } = useQuery(GET_PLACES);
  const places = isFilledArray(data?.places) ? data?.places : null;

  return (
    <div>
      <h1>Fit.me</h1>
      <h2>Sport places</h2>
      {places && places.map((p) => <p key={p.id}>{p.name}</p>) }
    </div>
  );
}
