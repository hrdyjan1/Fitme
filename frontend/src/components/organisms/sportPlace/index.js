/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import clsx from 'clsx';
import { gql, useQuery } from '@apollo/client';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { colors, useMediaQuery } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { route } from 'src/constants/routes';
import { isFilledArray } from 'src/constants/array';
import { SportPlaceTemplate } from 'src/templates/SportPlaceTemplate';

const useStyles = makeStyles((theme) => ({
  ratingIcon: {
    color: colors.yellow[700],
    marginRight: theme.spacing(1 / 2),
  },
}));

const GET_ALL_SPORT_TYPES = gql`
  query GetAllSportTypes {
    allSportTypes {
      sportTypeName
    }
  }
`;
const GET_FILTERED_PLACES = gql`
  query SearchPlaces($containedName: String, $sportType: String, $city: String) {
    searchPlaces(containedName: $containedName, sportType: $sportType, city: $city) {
      uid
      description
      name
      imageURL
    }
  }
`;

const initialSearchPlaceData = { category: null, searchValue: null, city: null };

function handleCategoriesOptions(data) {
  return data?.allSportTypes.map((s) => ({ title: s.sportTypeName })) || [];
}

function handleFilterPlacesQueryOptions(data) {
  return {
    variables: { containedName: data.searchValue, sportType: data.category, city: data.city },
  };
}

function setNullIfEmpty(value) {
  return value === '' ? null : value;
}

function handlePlaces(data) {
  const isFilled = isFilledArray(data);
  return isFilled ? data.map((p) => ({ ...p, id: p.uid })) : null;
}

const SportPlace = ({
  sportData, className, includeFilter = true, showAll, ...rest
}) => {
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();
  const [city, setCity] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');
  const { data: sportTypesData } = useQuery(GET_ALL_SPORT_TYPES);
  const [searchPlaceData, setSearchPlaceData] = React.useState(
    initialSearchPlaceData,
  );

  const categoriesOptions = handleCategoriesOptions(sportTypesData);

  // 👓 Filtered Places
  const filteredPlacesQueryOptions = handleFilterPlacesQueryOptions(searchPlaceData);
  const { data: filteredData, loading } = useQuery(GET_FILTERED_PLACES, filteredPlacesQueryOptions);
  const data = sportData || filteredData?.searchPlaces;
  const places = handlePlaces(data);
  const maxPlaceToSee = showAll && places ? places.length : 6;

  // 🎬 Change category or search-value
  const onCityChange = (_, value) => setCity(value);
  const onCategoryChange = (_, value) => setCategory(value);
  const onSearchValueChange = (_, value) => setSearchValue(value);

  const goToSportPlaces = () => history.push(route.sportPlaces());

  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const handleFilterClick = () => {
    const validCity = setNullIfEmpty(city);
    const validCategory = setNullIfEmpty(category);
    const validSearchValue = setNullIfEmpty(searchValue);
    setSearchPlaceData({
      city: validCity,
      category: validCategory,
      searchValue: validSearchValue,
    });
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
      onCityChange={onCityChange}
      includeFilter={includeFilter}
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
