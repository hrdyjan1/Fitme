import { uuidv4 } from '../../constants/uuid';
import { checkIfValidEmail } from '../../constants/checkIfValidEmail';
import argon2 from 'argon2';
import { EMAIL, sendEmail } from '../../utils/email';
import { createToken } from '../../libs/token';

export const updatePlaceBasics = async (
  _,
  { placeBasics },
  { dbConnection },
) => {
  const {
    id,
    uid,
    name,
    ico,
    email,
    phoneNumber,
    description,
    latitude,
    longitude,
    street,
    city,
  } = placeBasics;
  const updatedPlaceRows = (
    await dbConnection.query(
      `UPDATE place SET name = ?, description = ?, latitude = ?, longitude = ?, ico = ? WHERE id = ?`,
      [name, description, latitude, longitude, ico, id],
    )
  ).affectedRows;

  const updatedUserRows = (
    await dbConnection.query(
      `UPDATE user SET email = ?, phoneNumber = ?, street = ?, city = ? WHERE id = ?`,
      [email, phoneNumber, street, city, uid],
    )
  ).affectedRows;

  return updatedPlaceRows === 1 && updatedUserRows === 1;
};

export const signupPlace = async (
  _,
  { firstName, lastName, ico, name, email, password },
  { dbConnection, req },
) => {
  await checkIfValidEmail(email, dbConnection);
  const id = uuidv4();
  const verificationToken = uuidv4();
  const hashedPassword = await argon2.hash(password);

  //added type column to see which type of user it is
  await dbConnection.query(
    `INSERT INTO user (id, email, firstName, lastName, password, verificationToken, verified, lockedToken, type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    [
      id,
      email,
      firstName,
      lastName,
      hashedPassword,
      verificationToken,
      0,
      '',
      'place',
    ],
  );

  await dbConnection.query(
    `INSERT INTO Address (uid)
      VALUES (?);`,
    [id],
  );

  await dbConnection.query(
    `INSERT INTO place (id, uid, name, ico)
      VALUES (?, ?, ?, ?);`,
    [uuidv4(), id, name, ico],
  );

  const emailText = `(Micha)Link pro overeni: \n\n http://frontend.team01.vse.handson.pro/verificationToken=${verificationToken} \n\n\n Pokud nechcete dostavat dalsi emaily z teto adresy kliknete zde:`;
  await sendEmail(EMAIL.header, email, 'Gratuluji', emailText);

  const user = { id, email, firstName, lastName, verified: 0 };
  const token = createToken({ id });

  return { user, token };
};

// DEPRECATED
export const insertPlace = async (
  _,
  { name, description, latitude, longitude },
  { dbConnection },
) => {
  const addedRows = (
    await dbConnection.query(
      `INSERT INTO place (id, name, description, latitude, longitude)
    VALUES (?, ?, ?, ?, ?);`,
      [uuidv4(), name, description, latitude, longitude],
    )
  ).affectedRows;

  return addedRows === 1;
};

//DEPRECATED
export const removePlace = async (_, { id }, { dbConnection }) => {
  const errorsStatus = (
    await dbConnection.query(`DELETE FROM place WHERE id = ?`, [id])
  ).warningStatus;

  return errorsStatus === 0;
};

//DEPRECATED
export const updatePlace = async (
  _,
  { id, name, description, latitude, longitude },
  { dbConnection },
) => {
  const updatedRows = (
    await dbConnection.query(
      `UPDATE place SET name = ?, description = ?, latitude = ?, longitude = ?
       WHERE id = ?`,
      [name, description, latitude, longitude, id],
    )
  ).affectedRows;

  return updatedRows === 1;
};
