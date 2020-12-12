import argon2 from 'argon2';

import { uuidv4 } from '../../constants/uuid';
import { Cloudinary } from '../../utils/cloudinary';
import { createToken } from '../../libs/token';
import { EMAIL, sendEmail } from '../../utils/email';
import { checkIfValidEmail } from '../../constants/checkIfValidEmail';
import getUser from './helper';

export const verify = async (_, { token }, { dbConnection }) => {
  const user = (
    await dbConnection.query(`SELECT * FROM user WHERE verificationToken = ?`, [
      token,
    ])
  )[0];

  if (user) {
    if (!user.verified) {
      await dbConnection.query(
        `UPDATE user SET verified = true WHERE verificationToken = ?;`,
        [token],
      );
      return true;
    }
  }
  return false;
};

export const signin = async (_, { email, password }, { dbConnection }) => {
  const user = (
    await dbConnection.query(`SELECT * FROM user WHERE email = ?`, [email])
  )[0];

  if (user) {
    const validPassword = await argon2.verify(user.password, password);
    if (validPassword) {
      if (user.verified === 0) {
        throw new Error('Váš email ještě nebyl ověřen.');
      }
      const token = createToken(user);
      return { user: user, token: token };
    }
  }

  throw new Error('Invalidní hodnoty.');
};

export const signup = async (
  _,
  { firstName, lastName, email, password },
  { dbConnection, req },
) => {
  await checkIfValidEmail(email, dbConnection);
  const id = uuidv4();
  const verificationToken = uuidv4();
  const hashedPassword = await argon2.hash(password);

  await dbConnection.query(
    `INSERT INTO user (id, email, firstName, lastName, password, verificationToken, verified, lockedToken, type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    [id, email, firstName, lastName, hashedPassword, verificationToken, 0, '', "athlete"],
  );

  await dbConnection.query(
    `INSERT INTO Address (uid)
      VALUES (?);`,
    [id],
  );

  await dbConnection.query(
    `INSERT INTO athlete (uid)
      VALUES (?);`,
    [id],
  );

  const emailText = `Dobrý den, gratulujeme. \n Váš link pro ověření: \n\n http://frontend.team01.vse.handson.pro/verificationToken=${verificationToken} \n\n\n. Pokud nechcete dostávat další emaily z této adresy klikněte zde:`;
  await sendEmail(EMAIL.header, email, 'Gratuluji', emailText);

  const user = { id, email, firstName, lastName, verified: 0 };
  const token = createToken({ id });

  return { user, token };
};

export const signupTrainer = async (
  _,
  { firstName, lastName, ico, email, password },
  { dbConnection, req },
) => {
  await checkIfValidEmail(email, dbConnection);
  const id = uuidv4();
  const verificationToken = uuidv4();
  const hashedPassword = await argon2.hash(password);

  await dbConnection.query(
    `INSERT INTO user (id, email, firstName, lastName, password, verificationToken, verified, lockedToken, type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    [id, email, firstName, lastName, hashedPassword, verificationToken, 0, '', 'trainer'],
  );

  await dbConnection.query(
    `INSERT INTO Address (uid)
      VALUES (?);`,
    [id],
  );

  await dbConnection.query(
    `INSERT INTO trainer (uid, ico)
      VALUES (?, ?);`,
    [id, ico],
  );

  const emailText = `Dobrý den, gratulujeme. \n Váš link pro ověření: \n\n http://frontend.team01.vse.handson.pro/verificationToken=${verificationToken} \n\n\n. Pokud nechcete dostávat další emaily z této adresy klikněte zde:`;
  await sendEmail(EMAIL.header, email, 'Gratuluji', emailText);

  const user = { id, email, firstName, lastName, ico, verified: 0 };
  const token = createToken({ id });

  return { user, token };
};

export const sendEmailForgotPass = async (_, { email }, { dbConnection }) => {
  const selectUserQuery = 'SELECT * FROM user WHERE email = ?;';
  const lockedUserQuery = 'UPDATE user SET lockedToken = ? WHERE email = ?;';

  const user = (await dbConnection.query(selectUserQuery, [email]))[0];

  if (!user) {
    throw new Error('Neexistujici uzivatel');
  }

  const lockedToken = uuidv4();
  await dbConnection.query(lockedUserQuery, [lockedToken, email]);
  const emailText = `Dobrý den. Link pro změnu hesla: \n\n http://frontend.team01.vse.handson.pro/lockedToken=${lockedToken} \n\n\n Pokud nechcete dostávat další emaily z této adresy klikněte zde:`;
  await sendEmail(EMAIL.header, email, 'Zmena emailu', emailText);

  return true;
};

export const changeForgotPass = async (_, args, { dbConnection }) => {
  const { password, lockedToken } = args;

  const resetQuery = 'UPDATE user SET lockedToken = "" WHERE lockedToken = ?;';
  const selectUserQuery = 'SELECT * FROM user WHERE lockedToken = ?;';
  const setPassQuery = 'UPDATE user SET password = ? WHERE lockedToken = ?;';

  const user = (await dbConnection.query(selectUserQuery, [lockedToken]))[0];

  if (!user) {
    throw new Error('Neexistujici uzivatel');
  }

  const hashedPassword = await argon2.hash(password);

  await dbConnection.query(setPassQuery, [hashedPassword, lockedToken]);
  await dbConnection.query(resetQuery, [lockedToken]);

  return true;
};

export const updatePassword = async (_, args, { dbConnection, auth }) => {
  const { oldPassword, newPassword } = args;

  let id;
  const selectUserQuery = 'SELECT password FROM user WHERE id = ?;';
  const updatePasswordQuery = 'UPDATE user SET password = ? WHERE id = ?;';

  try {
    id = await getUser(auth);
  } catch (error) {
    throw new Error('Session neexistujícího uživatele');
  }

  const user = (await dbConnection.query(selectUserQuery, [id]))[0];

  if (!user) {
    throw new Error('Neexistujici uzivatel');
  }

  const validPassword = await argon2.verify(user.password, oldPassword);
  if (!validPassword) {
    throw new Error('Původní zadané heslo není platné');
  }

  const newHashedPassword = await argon2.hash(newPassword);

  await dbConnection.query(updatePasswordQuery, [newHashedPassword, id]);

  return true;
}

export const updateUser = async (_, args, { dbConnection, auth }) => {
  const { email, firstName, lastName, nickname, phoneNumber, street, city, zipCode, country } = args;

  // const selectUserQuery = 'SELECT email, firstName, lastName, nickname, phoneNumber, street, city, zipCode, country FROM user WHERE id = ?;';
  const selectUserQuery = 'SELECT email, firstName, lastName, ath.nickname, phoneNumber, a.street, a.city, a.zipCode, a.country FROM `user` u JOIN Address a ON u.id = a.uid JOIN athlete ath ON u.id = ath.uid WHERE id = ?;';
  const updateUserQuery = 'UPDATE user SET email = ?, firstName = ?, lastName = ?, phoneNumber = ? WHERE id = ?;';
  const updateAddressQuery = 'UPDATE Address SET street = ?, city = ?, zipCode = ?, country = ? WHERE uid = ?;';
  const updateAthleteQuery = 'UPDATE athlete SET nickname = ? WHERE uid = ?;';

  let id = null;
  try {
    id = await getUser(auth);
  } catch  (error){
    throw new Error('Session neexistujícího uživatele');
  }

  const user = (await dbConnection.query(selectUserQuery, [id]))[0];

  if (!user) {
    throw new Error('Neexistujici uzivatel');
  }

  function getDefinedValue(arg, dbValue) {
    if (typeof arg !== ('undefined' || 'null')) {
      return arg;
    }
    return dbValue;
  }

  await dbConnection.query(updateUserQuery, [
    getDefinedValue(email, user.email),
    getDefinedValue(firstName, user.firstName),
    getDefinedValue(lastName, user.lastName),
    getDefinedValue(phoneNumber, user.phoneNumber),
    id
  ]);

  await dbConnection.query(updateAddressQuery, [
    getDefinedValue(street, user.street),
    getDefinedValue(city, user.city),
    getDefinedValue(zipCode, user.zipCode),
    getDefinedValue(country, user.country),
    id
  ]);

  await dbConnection.query(updateAthleteQuery, [
    getDefinedValue(nickname, user.nickname),
    id
  ]);

  return true;
}

export const uploadProfileImage = async (_, { file }, ctx) => {
  const { auth, dbConnection } = ctx;
  try {
    const id = await getUser(auth);
    const updateImageURLQuery = 'UPDATE user SET imageURL = ? WHERE id = ?;';

    if (id) {
      const { url } = await Cloudinary.v2.uploader.upload(file);
      await dbConnection.query(updateImageURLQuery, [url, id]);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
