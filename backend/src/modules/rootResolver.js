import { queries as UserQueries, mutations as UserMutations } from './user';
import { queries as PlaceQueries, mutations as PlaceMutations } from './place';
import { queries as TrainerQueries, mutations as TrainerMutations } from './trainer';

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
    // TODO:-------SOLUTION FOR LAST SPRINT------
    allSportTypes: async (_p, _c, {dbConnection}) => {
      return dbConnection.query('SELECT sportTypeName FROM sportType;');
    },
    ...UserQueries,
    ...PlaceQueries,
    ...TrainerQueries,
  },
  Mutation: {
    ...UserMutations,
    ...PlaceMutations,
    ...TrainerMutations,
  },
};
