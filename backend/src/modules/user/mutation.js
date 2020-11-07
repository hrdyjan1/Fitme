import nodemailer from 'nodemailer';

import { createToken } from '../../libs/token';
import { uuidv4 } from '../../constants/uuid';
import { checkIfValidEmail } from '../../constants/checkIfValidEmail';

const address = 'http://localhost:3000/';
const sendEmail = async (from, to, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',
    port: 2525,
    auth: {
      user: 'emai.fit.me@gmail.com',
      pass: '5835125C8A5ED5CACDD56C0E403D6800D2C6',
    },
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
      return true;
    }
  }
  return false;
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
  { dbConnection, req },
) => {
  await checkIfValidEmail(email, dbConnection);
  const id = uuidv4();
  const verificationToken = uuidv4();

  await dbConnection.query(
    `INSERT INTO user (id, email, firstName, lastName, password, verificationToken, verified)
      VALUES (?, ?, ?, ?, ?, ?, ?);`,
    [id, email, firstName, lastName, password, verificationToken, 0],
  );

  const emailText = `(Micha)Link pro overeni: \n\n http://frontend.team01.vse.handson.pro/verificationToken=${verificationToken} \n\n\n Pokud nechcete dostavat dalsi emaily z teto adresy kliknete zde:`;
  await sendEmail(
    '"Fit me 🥇" <emai.fit.me@gmail.com>',
    email,
    'Gratuluji',
    emailText,
  );

  const user = { id, email, firstName, lastName, verified: 0 };
  const token = createToken({ id });

  return { user, token };
};
