import argon2 from 'argon2';

import { uuidv4 } from '../../constants/uuid';
import { createToken } from '../../libs/token';
import { EMAIL, sendEmail } from '../../utils/email';
import { checkIfValidEmail } from '../../constants/checkIfValidEmail';

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
    await dbConnection.query(
      `SELECT * FROM user WHERE email = ?`,
      [email],
    )
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
    `INSERT INTO user (id, email, firstName, lastName, password, verificationToken, verified, lockedToken)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
    [id, email, firstName, lastName, hashedPassword, verificationToken, 0, ''],
  );

  const emailText = `(Micha)Link pro overeni: \n\n http://frontend.team01.vse.handson.pro/verificationToken=${verificationToken} \n\n\n Pokud nechcete dostavat dalsi emaily z teto adresy kliknete zde:`;
  await sendEmail(EMAIL.header, email, 'Gratuluji', emailText);

  const user = { id, email, firstName, lastName, verified: 0 };
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
  const emailText = `(Micha)Link pro zmenu hesla: \n\n http://frontend.team01.vse.handson.pro/lockedToken=${lockedToken} \n\n\n Pokud nechcete dostavat dalsi emaily z teto adresy kliknete zde:`;
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
