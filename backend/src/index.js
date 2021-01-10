import dotenv from 'dotenv-flow';
import express from 'express';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';

import { getConnection } from './libs/connection';
import rootResolver from './modules/rootResolver';

dotenv.config();

const typeDefs = gql`
  type Place {
    name: String!
    description: String
    uid: String
    imageURL: String
  }

  type Trainer {
    id: String!
    firstName: String!
    lastName: String!
    description: String
    imageURL: String
  }

  type SportType {
    stid: Int!
    sportTypeName: String!
  }

  type User {
    id: String!
    email: String!
    verified: Int!
    firstName: String!
    lastName: String!
    locked: Int!
    lockedToken: String!
    type: String!
  }

  type UserDetail {
    email: String
    nickname: String
    firstName: String
    lastName: String
    phoneNumber: String
    street: String
    city: String
    zipCode: String
    country: String
    imageURL: String
  }

  type PlaceImage {
    iid: Int!
    uid: String
    imageURL: String!
  }

  type Tag {
    id: String!
    uid: String
    name: String!
  }

  type TrainerDetail {
    ico: String!
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String!
    description: String!
    placeList: [Place]!
    sportTypeList: [SportType]
    street: String!
    city: String!
    zipCode: String!
    country: String!
    imageURL: String!
  }

  type PlaceDetail {
    id: String!
    firstName: String!
    lastName: String!
    name: String!
    ico: String!
    email: String!
    phoneNumber: String!
    description: String!
    zipCode: String!
    country: String!
    pictureList: [PlaceImage]
    sportTypeList: [SportType]
    trainerList: [Trainer]
    street: String!
    city: String!
    imageURL: String!
  }

  type AuthInfo {
    token: String!
    user: User!
  }

  type Query {
    todo: String!
    users: [User]!
    user: UserDetail!
    places: [Place!]!
    place(uid: String!): PlaceDetail!
    trainer(uid: String!): TrainerDetail!
    searchPlaces(containedName: String, sportType: String): [Place!]!
    allSportTypes: [SportType]!
    allTrainers: [Trainer]!
    userSportTypes: [SportType]!
    placeTrainers: [Trainer]!
  }

  type Mutation {
    # User
    uploadProfileImage(file: String!): Boolean
    sendEmailForgotPass(email: String!): Boolean
    changeForgotPass(password: String!, lockedToken: String!): Boolean
    verify(token: String!): Boolean!
    signin(email: String!, password: String!): AuthInfo!
    signup(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): AuthInfo!
    updateUser(
      email: String
      firstName: String
      lastName: String
      nickname: String
      phoneNumber: String
      street: String
      city: String
      zipCode: String
      country: String
    ): Boolean!
    updatePassword(oldPassword: String!, newPassword: String!): Boolean!
    # Trainer
    signupTrainer(
      firstName: String!
      lastName: String!
      email: String!
      ico: String!
      password: String!
    ): AuthInfo!
    updateTrainer(
      uid: String
      ico: String
      email: String
      phoneNumber: String
      description: String
      firstName: String
      lastName: String
      street: String
      city: String
      zipCode: String
      country: String
    ): Boolean
    # Place
    signupPlace(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      ico: String!
      name: String!
    ): AuthInfo!
    updatePlaceBasics(
      id: String!
      uid: String!
      firstName: String
      lastName: String
      name: String
      ico: String
      email: String
      phoneNumber: String
      description: String
      street: String
      city: String
      zipCode: String
      country: String
    ): Boolean
    deletePlaceImage(iid: Int!): Boolean!
    uploadPlaceImage(file: String!): Boolean!
    addTag(name: String!): Boolean!
    deleteTag(name: String!): Boolean!
    addTrainer(tid: String!): Boolean!
    removeTrainer(tid: String!): Boolean!
    addSportType(stid: Int!): Boolean!
    removeSportType(stid: Int!): Boolean!
  }
`;

const main = async () => {
  const app = express();

  app.disable('x-powered-by');
  app.use(cors());

  let dbConnection = null;

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: rootResolver,
    context: async ({ req, res }) => {
      if (!dbConnection) {
        dbConnection = await getConnection();
      }
      const { authorization, Authorization } = req.headers;
      const auth = authorization || Authorization || '';

      return {
        req,
        res,
        dbConnection,
        auth,
      };
    },
    playground: true,
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
    bodyParserConfig: {
      limit: '10mb',
    },
  });

  const port = process.env.PORT || 4000;

  app.get('/', (_, res) => res.redirect('/graphql'));

  app.listen(port, () => {
    console.info(`Server started at http://localhost:${port}/graphql`);
  });
};

main();
