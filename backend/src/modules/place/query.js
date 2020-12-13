import getUser from '../user/helper'

const singlePlace = async (_, { uid }, { dbConnection }) => {

  const placeArray = await dbConnection.query('SELECT * FROM place WHERE uid = ?', [uid])
  const place = placeArray[0];

  const pictureListArray = await dbConnection.query('SELECT * FROM placeGallery WHERE uid = ?;', [uid])
  const pictureList = pictureListArray[0] || []

  const tagListArray = await dbConnection.query('SELECT * FROM tag WHERE uid = ?;', [uid])
  const tagList = tagListArray[0] || []

  const user = (
    await dbConnection.query('SELECT * FROM user WHERE id = ?;', [uid])
  )[0];

  if (place && user) {
    return {
      id: place.id,
      ico: place.ico,
      name: place.name,
      tagList: tagList,
      city: user.city || '',
      email: user.email || '',
      street: user.street || '',
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

export const images = async (_p, _c, { dbConnection, auth }) => {
  const selectFacilityImagesQuery = 'SELECT iid, imageURL FROM placeGallery WHERE uid = ?;';

  let id = null;
  try {
    id = await getUser(auth);
  } catch (error){
    throw new Error('Session neexistujícího uživatele')
  }

  if (id) {
    return await dbConnection.query(selectFacilityImagesQuery, [id]);
  }
  return null;
};

export { singlePlace as place };

//-------SOLUTION FOR LAST SPRINT------
// export const sportTypes = async (_p, _c, { dbConnection, auth }) => {
//
//   const selectFacilitySportTypesQuery = 'SELECT sportTypeName FROM placeSportType pst JOIN sportType st USING (stid) WHERE pst.uid= ?;';
//
//   let id = null;
//   try {
//     id = await getUser(auth);
//   } catch (error){
//     throw new Error('Session neexistujícího uživatele')
//   }
//
//   if (id) {
//     return (await dbConnection.query(selectFacilitySportTypesQuery, [id]));
//   }
//   return null;
// };
