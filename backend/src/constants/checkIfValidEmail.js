async function checkIfValidEmail(email, dbConnection) {
  const exists = (await dbConnection.query(
    'SELECT * FROM user WHERE email = ?',
    [email],
  ))[0]

  if (exists) {
    throw new Error('Email je již zabraný.');
  }
}

export { checkIfValidEmail };
