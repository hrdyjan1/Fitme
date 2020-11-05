import nodemailer from 'nodemailer';

import { createToken } from '../../libs/token';
import { uuidv4 } from '../../constants/uuid';
import { checkIfValidEmail } from '../../constants/checkIfValidEmail';

const address = 'http://localhost:3000/';
const sendEmail = async (from, to, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: { user: 'a6c5e91a9dbd75', pass: 'ab98f2fd76bb4e' },
  });

  return await transporter.sendMail({ from, to, subject, text });
};

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
      return true
    }
  }
  return false
};

export const signin = async (_, { email, password }, { dbConnection }) => {
  const user = (
    await dbConnection.query(
      `SELECT * FROM user WHERE email = ? AND password = ?`,
      [email, password],
    )
  )[0];

  if (user) {
    const token = createToken(user);
    return { user: user, token: token };
  }

  throw new Error('Invalidní hodnoty.');
};

export const signup = async (
  _,
  { firstName, lastName, email, password },
  { dbConnection,req },
) => {
  await checkIfValidEmail(email, dbConnection);
  const id = uuidv4();
  const verificationToken = uuidv4();

  await dbConnection.query(
    `INSERT INTO user (id, email, firstName, lastName, password, verificationToken, verified)
      VALUES (?, ?, ?, ?, ?, ?, ?);`,
    [id, email, firstName, lastName, password, verificationToken, 0],
  );

  
  const emailText = `Link pro overeni http://${req.get('host')}verificationToken=${verificationToken}`;
  await sendEmail(
    '"Fit me 🥇" <no-reply@fitme.com>',
    email,
    'Gratuluji',
    emailText,
  );

  const user = { id, email, firstName, lastName, verified: 0 };
  const token = createToken({ id });

  return { user, token };
};
