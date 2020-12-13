const singleTrainer = async (_, { uid }, { dbConnection }) => {

  const trainerArray = await dbConnection.query('SELECT * FROM trainer WHERE uid = ?', [uid])
  const trainer = trainerArray[0];

  const tagListArray = await dbConnection.query('SELECT * FROM tag WHERE uid = ?;', [uid])
  const tagList = tagListArray[0] || []

  const address = (
    await dbConnection.query('SELECT * FROM Address WHERE uid = ?', [uid])
  )[0];

  const user = (
    await dbConnection.query('SELECT * FROM user WHERE id = ?;', [uid])
  )[0];

  if (trainer && user && address) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      ico: trainer.ico,
      tagList: tagList,
      email: user.email || '',
      city: address.city || '',
      street: address.street || '',
      zipCode: address.zipCode || '',
      country: address.country || '',
      imageURL: user.imageURL || '',
      phoneNumber: user.phoneNumber || '',
      description: trainer.description || '',
    };
  } else {
    throw new Error('Neexistující trenér.');
  }
};

export { singleTrainer as trainer };

