import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import {
  HeroDetail, Contact, Story, ChipList,
} from 'src/components/molecules';
import Section from 'src/components/organisms/Section';
import { SectionAlternate, SportPlace } from 'src/components/organisms';
import { isFilledArray } from 'src/constants/array';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    width: '100%',
  },
  sectionNoPaddingTop: {
    paddingTop: 0,
  },
}));

const GET_TRAINER = gql`
  query GetTrainer($uid: String!) {
    trainer(uid: $uid) {
      firstName
      lastName
      email
      phoneNumber
      description
      placeList {
        uid
        name
        imageURL
        description
      }
      sportTypeList {
        sportTypeName
      }
      street
      city
      imageURL
    }
  }
`;

const backgroundImgSrc = 'https://topfigurefitness.cz/wp-content/uploads/2015/03/bg-sport-new.png';

function TrainerDetailPage() {
  const classes = useStyles();
  const params = useParams();
  const uid = params.id;
  const { data } = useQuery(GET_TRAINER, { variables: { uid } });

  const name = `${data?.trainer.firstName} ${data?.trainer.lastName}`;

  const shouldShowStory = !!data?.trainer.description;
  const shouldShowSportPlaces = !!data?.trainer.placeList;
  const shouldShowCategory = isFilledArray(data?.trainer.sportTypeList);

  const sportTypeList = data?.trainer.sportTypeList || [];
  const sportPlaceData = data?.trainer.placeList || [];

  const chipListData = sportTypeList.map((t, i) => ({
    key: i,
    label: t.sportTypeName,
  }));

  return (
    <div className={classes.root}>
      <HeroDetail
        title={name}
        subtitle={`Zde je seznam informací k trenérovi ${name}.`}
        src={backgroundImgSrc}
      />
      {shouldShowStory && (
        <Section>
          <Story
            description={data?.trainer.description}
            imageURL={data?.trainer.imageURL}
          />
        </Section>
      )}
      {shouldShowSportPlaces && (
        <Section>
          <SportPlace
            showAll
            sportData={sportPlaceData}
            includeFilter={false}
          />
        </Section>
      )}
      {shouldShowCategory && (
        <SectionAlternate>
          <ChipList data={chipListData} />
        </SectionAlternate>
      )}
      <Section>
        <Contact
          title="Kontaktujte mě"
          city={data?.trainer.city}
          street={data?.trainer.street}
          phone={data?.trainer.phoneNumber}
          email={data?.trainer.email}
        />
      </Section>
    </div>
  );
}

export { TrainerDetailPage };
