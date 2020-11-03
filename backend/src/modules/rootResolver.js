import { mutations as UserMutations } from './user';

export default {
  Query: {
    places: async (_p, _c, { dbConnection }) => {
      return dbConnection.query('SELECT * FROM place');
    },
    todo: async () => {
      return new Date().toISOString();
    },
  },
  Mutation: {
    ...UserMutations,
  },
};
