import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Section from 'src/components/organisms/Section';
import { isFilledArray } from 'src/constants/array';
import {
  Story,
  HeroSportPlace,
  Team,
  Contact,
  ChipList,
  GallerySportPlace,
} from 'src/components/molecules';
import { SectionAlternate } from 'src/components/organisms';

const GET_PLACE = gql`
  query GetPlace($uid: String!) {
    place(uid: $uid) {
      id
      name
      city
      email
      street
      imageURL
      phoneNumber
      description
      sportTypeList {
        sportTypeName
      }
      trainerList {
        imageURL
        firstName
        lastName
      }
      pictureList {
        imageURL
      }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
  },
  sectionNoPaddingTop: {
    paddingTop: 0,
  },
  sectionPartners: {
    boxShadow: '0 5px 20px 0 rgba(90, 202, 157, 0.05)',
    '& .section-alternate__content': {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
  },
}));

const SportPlaceDetailPage = () => {
  const classes = useStyles();
  const params = useParams();
  const uid = params.id;
  const { data } = useQuery(GET_PLACE, { variables: { uid } });
  const trainerList = data?.place.trainerList || [];
  const pictureTypeList = data?.place.pictureList || [];
  const sportTypeList = data?.place.sportTypeList || [];

  const chipListData = sportTypeList.map((t, i) => ({
    key: i,
    label: t.sportTypeName,
  }));
  const trainerListData = trainerList.map((t) => ({
    authorName: `${t.firstName} ${t.lastName}`,
    imageURL: t.imageURL,
  }));
  const pictureListData = pictureTypeList.map((t) => ({
    imageURL: t.imageURL,
    cols: 2,
  }));

  const shouldShowStory = !!data?.place.description;
  const shouldShowCategory = isFilledArray(chipListData);
  const shouldShowTrainers = isFilledArray(trainerListData);
  const shouldShowPictures = isFilledArray(pictureListData);

  return (
    <div className={classes.root}>
      <HeroSportPlace name={data?.place.name} />
      {shouldShowStory && (
        <Section>
          <Story
            description={data?.place.description}
            imageURL={data?.place.imageURL}
          />
        </Section>
      )}
      {shouldShowCategory && (
        <SectionAlternate>
          <ChipList data={chipListData} />
        </SectionAlternate>
      )}
      {shouldShowTrainers && (
        <Section>
          <Team data={trainerListData} />
        </Section>
      )}
      {shouldShowPictures && (
        <SectionAlternate>
          <GallerySportPlace data={pictureListData} />
        </SectionAlternate>
      )}
      <Section>
        <Contact
          city={data?.place.city}
          street={data?.place.street}
          phone={data?.place.phoneNumber}
          email={data?.place.email}
        />
      </Section>
    </div>
  );
};

export { SportPlaceDetailPage };