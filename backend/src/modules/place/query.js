import getUser from '../user/helper'

const singlePlace = async (_, { uid }, { dbConnection }) => {

  const placeArray = await dbConnection.query('SELECT * FROM place WHERE uid = ?;', [uid])
  const place = placeArray[0];
  const addressArray = await dbConnection.query('SELECT * FROM Address WHERE uid = ?;', [uid])
  const address = addressArray[0];

  const pictureListArray = await dbConnection.query('SELECT * FROM placeGallery WHERE uid = ?;', [uid])
  const pictureList = pictureListArray || [];
  const tagListArray = await dbConnection.query('SELECT * FROM tag WHERE uid = ?;', [uid])
  const tagList = [tagListArray[0]] || [];

  const user = (
    await dbConnection.query('SELECT * FROM user WHERE id = ?;', [uid])
  )[0];

  if (place && user) {
    return {
      id: place.id,
      firstName: user.firstName,
      lastName: user.lastName,
      ico: place.ico,
      name: place.name,
      tagList: tagList,
      city: address.city || '',
      email: user.email || '',
      street: address.street || '',
      zipCode: address.zipCode || '',
      country: address.country || '',
      pictureList: pictureList,
      latitude: place.latitude || '',
      longitude: place.longitude || '',
      phoneNumber: user.phoneNumber || '',
      description: place.description || '',
    };
  } else {
    throw new Error('Neexistující sportoviště.');
  }
};

export { singlePlace as place };

export const searchPlaces = async (_, { containedName, sportType }, {dbConnection} ) => {

  const selectFilteredPlacesQuery =
    `SELECT DISTINCT name, description, latitude, longitude, uid 
    FROM place p 
    LEFT JOIN userSportType pst USING (uid)
    LEFT JOIN sportType st USING (stid)`;

  if (typeof containedName === 'undefined' || containedName === null) {
    containedName = "";
  }

  if (typeof sportType === 'undefined' || sportType === null) {
    let whereCondition = `WHERE name LIKE '%${containedName}%';`;
    let wholeQuery = `${selectFilteredPlacesQuery} ${whereCondition}`;

    return await dbConnection.query(wholeQuery);
  } else {
    let whereCondition = `WHERE sportTypeName = ? AND name LIKE '%${containedName}%';`;
    let wholeQuery = `${selectFilteredPlacesQuery} ${whereCondition}`;

    return await dbConnection.query(wholeQuery, [sportType]);
  }
}

export const placeTrainers = async (_p, _c, { dbConnection, auth }) => {

  const selectPlaceTrainersQuery = 'SELECT u.id, u.firstName, u.lastName, t.description, u.imageURL FROM place p JOIN placeTrainer pt ON p.uid=pt.pid JOIN trainer t ON pt.tid=t.uid JOIN `user` u ON t.uid=u.id WHERE pt.pid = ?';

  let id = null;
  try {
    id = await getUser(auth);
  } catch (error){
    throw new Error('Session neexistujícího uživatele')
  }

  if (id) {
    return (await dbConnection.query(selectPlaceTrainersQuery, [id]));
  }
  return null;
};


