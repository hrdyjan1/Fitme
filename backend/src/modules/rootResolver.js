import { queries as PlaceQueries } from './place';
import { queries as UserQueries, mutations as UserMutations } from './user';
import { mutations as PlaceMutations } from './place';

export default {
  Query: {
    places: async (_p, _c, { dbConnection }) => {
      return dbConnection.query('SELECT * FROM place');
    },
    todo: async () => {
      return new Date().toISOString();
    },
    users: async (_p, _c, { dbConnection }) => {
      return dbConnection.query('SELECT * FROM user');
    },
    allSportTypes: async (_p, _c, {dbConnection}) => {
      return dbConnection.query('SELECT sportTypeName FROM sportType;');
    },
    ...UserQueries,
    ...PlaceQueries,
  },
  Mutation: {
    ...UserMutations,
    ...PlaceMutations,
  },
};
