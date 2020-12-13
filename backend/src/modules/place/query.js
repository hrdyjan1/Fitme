const singlePlace = async (_, { uid }, { dbConnection }) => {
    
  const placeArray = await dbConnection.query('SELECT * FROM place WHERE uid = ?', [uid])
  const place = placeArray[0];

  const pictureListArray = await dbConnection.query('SELECT * FROM image WHERE uid = ?;', [uid])
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

export { singlePlace as place };
