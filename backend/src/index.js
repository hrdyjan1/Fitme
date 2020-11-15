import dotenv from 'dotenv-flow';
import express from 'express';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';

import { getConnection } from './libs/connection';
import rootResolver from './modules/rootResolver';

dotenv.config();

const typeDefs = gql`
  type Place {
    id: String!
    name: String!
    description: String!
    latitude: Float!
    longitude: Float!
  }
  type Query {
    todo: String!
    users: [User]!
    places: [Place!]!
  }

  type User {
    id: String!
    email: String!
    verified: Int!
    firstName: String!
    lastName: String!
    locked: Int!
    lockedToken: String!
  }

  type AuthInfo {
    token: String!
    user: User!
  }

  type Mutation {
    # User
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
    updatePassword(
      password: String!
      newPassword: String!
    ): Boolean!
    # Place
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

  apolloServer.applyMiddleware({ app, cors: false });

  const port = process.env.PORT || 4000;

  app.get('/', (_, res) => res.redirect('/graphql'));

  app.listen(port, () => {
    console.info(`Server started at http://localhost:${port}/graphql`);
  });
};

main();
