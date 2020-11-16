import getUser from './helper'

export const user = async (_, __, { dbConnection, auth }) => {
  const selectUserQuery = 'SELECT nickname, firstName, lastName, email, phoneNumber, zipCode, city, street, country, imageURL  FROM user WHERE id = ?;';

  let id = null;
  try {
    id = await getUser(auth);
  } catch  (error){
    throw new Error('Session neexistujícího uživatele');
  }

  if (id) {
    return (await dbConnection.query(selectUserQuery, [id]))[0]
  }
  return null
};
