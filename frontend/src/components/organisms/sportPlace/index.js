/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import clsx from 'clsx';
import { gql, useQuery } from '@apollo/client';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  colors,
  useMediaQuery,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { route } from 'src/constants/routes';
import { isFilledArray } from 'src/constants/array';
import { SportPlaceTemplate } from 'src/templates/SportPlaceTemplate';

const GET_PLACES = gql`
  query GetPlaces {
    places {
      uid
      name
      description
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  ratingIcon: {
    color: colors.yellow[700],
    marginRight: theme.spacing(1 / 2),
  },

}));

const categoriesOptions = [
  { title: 'Jóga' },
  { title: 'Běhání' },
  { title: 'Posilování' },
  { title: 'Aerobik' },
  { title: 'Zumba' },
];

const SportPlace = ({ className, showAll, ...rest }) => {
  const classes = useStyles();
  // TODO: Correct places @Michalinka
  // Needs to useMutation with 'category' and 'searchValue'
  const { data } = useQuery(GET_PLACES);
  const places = isFilledArray(data?.places) ? data?.places : null;

  const timer = React.useRef();
  const [loading, setLoading] = React.useState(false);
  const [category, setCategory] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');

  const onCategoryChange = (_, value) => setCategory(value);
  const onSearchValueChange = (_, value) => setSearchValue(value);

  const history = useHistory();
  const goToSportPlaces = () => history.push(route.sportPlaces());
  const maxPlaceToSee = showAll && places ? places.length : 6;

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const handleFilterClick = () => {
    if (!loading) {
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const rating = (count) => {
    const ratingArray = [];
    for (let i = 1; i <= 5; i += 1) {
      ratingArray.push(
        <i
          className={clsx(
            i <= count ? 'fas fa-star' : 'far fa-star',
            classes.ratingIcon,
          )}
          key={i}
        />,
      );
    }

    return ratingArray;
  };

  return (
    <SportPlaceTemplate
      isMd={isMd}
      places={places}
      rating={rating}
      loading={loading}
      showAll={showAll}
      className={className}
      maxPlaceToSee={maxPlaceToSee}
      goToSportPlaces={goToSportPlaces}
      onCategoryChange={onCategoryChange}
      categoriesOptions={categoriesOptions}
      handleFilterClick={handleFilterClick}
      onSearchValueChange={onSearchValueChange}
      {...rest}
    />
  );
};

export default SportPlace;
