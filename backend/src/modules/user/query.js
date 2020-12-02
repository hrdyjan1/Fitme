import getUser from './helper'

export const user = async (_, __, { dbConnection, auth }) => {
  const selectUserQuery = 'SELECT ath.nickname, firstName, lastName, email, phoneNumber, a.zipCode, a.city, a.street, a.country, imageURL  FROM `user` u JOIN Address a ON u.id = a.uid JOIN athlete ath ON u.id = ath.uid WHERE id = ?;';
  // const selectUserQuery = 'SELECT email, firstName, lastName, ath.nickname, phoneNumber, a.street, a.city, a.zipCode, a.country FROM `user` u JOIN Address a ON u.id = a.uid JOIN athlete ath ON u.id = ath.uid WHERE id = ?;';
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
