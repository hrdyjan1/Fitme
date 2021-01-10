const singleTrainer = async (_, { uid }, { dbConnection }) => {

  const trainerArray = await dbConnection.query('SELECT * FROM trainer WHERE uid = ?', [uid])
  const trainer = trainerArray[0];

  const sportTypeListArray = await dbConnection.query('SELECT * FROM userSportType pst JOIN sportType st USING (stid) WHERE pst.uid= ?;', [uid]);

  //TODO: this is not working every time, I will fix it ASAP
  const placeListArray = await  dbConnection.query('SELECT p.uid, p.name, p.description, u.imageURL FROM trainer t JOIN placeTrainer pt ON t.uid=pt.tid JOIN place p ON pt.pid=p.uid JOIN `user` u ON p.uid=u.id WHERE pt.tid = ?', [uid]);

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
      // tagList: tagList,
      sportTypeList: sportTypeListArray || [],
      placeList: placeListArray || [],
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

