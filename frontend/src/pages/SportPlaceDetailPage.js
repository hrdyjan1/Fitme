import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Section from 'src/components/organisms/Section';
import { isFilledArray } from 'src/constants/array';
import {
  Story,
  Team,
  Contact,
  ChipList,
  HeroDetail,
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
        stid
        sportTypeName
      }
      trainerList {
        id
        imageURL
        firstName
        lastName
      }
      pictureList {
        iid
        imageURL
      }
    }
  }
`;

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    width: '100%',
  },
  sectionNoPaddingTop: {
    paddingTop: 0,
  },
}));

const backgroundImgSrc = 'https://www.crossfitescape.com.au/wp-content/uploads/2015/04/Gym-Background1.png';

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
    ...t,
    key: t.id,
    authorName: `${t.firstName} ${t.lastName}`,
    imageURL: t.imageURL,
  }));
  const pictureListData = pictureTypeList.map((t) => ({
    key: t.iid,
    imageURL: t.imageURL,
    cols: 2,
  }));

  const shouldShowStory = !!data?.place.description;
  const shouldShowCategory = isFilledArray(chipListData);
  const shouldShowTrainers = isFilledArray(trainerListData);
  const shouldShowPictures = isFilledArray(pictureListData);

  return (
    <div className={classes.root}>
      <HeroDetail
        title={data?.place.name}
        subtitle={`Zde je seznam informací ke sportovišti ${data?.place.name}.`}
        src={backgroundImgSrc}
      />
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
          title="Kontaktujte nás"
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
