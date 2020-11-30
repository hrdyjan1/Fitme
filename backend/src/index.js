import dotenv from 'dotenv-flow';
import express from 'express';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';

import { getConnection } from './libs/connection';
import rootResolver from './modules/rootResolver';

dotenv.config();

const typeDefs = gql`
  type Place {
    id: String
    name: String!
    description: String
    latitude: Float
    longitude: Float
  }

  type Picture {
    imageId: Int!
    imageUrl: String!
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
  #DEPRECATED
#  type PlaceDetail {
#    email: String
#    firstName: String
#    lastName: String
#    phoneNumber: String
#    street: String
#    city: String
#    zipCode: String
#    country: String
#  }

  type PlaceDetail {
    id: String!
    email: String!
    verified: Int!
    firstName: String!
    lastName: String!
    locked: Int!
    lockedToken: String!
    name: String!
    description: String!
    latitude: Float!
    longitude: Float!
    pictureList: [Picture]!
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
    place: PlaceDetail!
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
    # Place
    signupPlace(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      ico: String!
      name: String!
    ): AuthInfo!
    insertPlace(
      name: String!
      description: String!
      latitude: Float!
      longitude: Float!
    ): Boolean!
    updatePlace(
      id: String!
      name: String!
      description: String!
      latitude: Float!
      longitude: Float!
    ): Boolean!
    removePlace(id: String!): Boolean!
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
