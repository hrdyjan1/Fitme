import {checkIfValidEmail} from "../../constants/checkIfValidEmail";
import {uuidv4} from "../../constants/uuid";
import argon2 from "argon2";
import {EMAIL, sendEmail} from "../../utils/email";
import {createToken} from "../../libs/token";

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

export const updateTrainerBasics = async (
  _,
  { trainerBasics },
  { dbConnection },
) => {
  const {
    uid,
    ico,
    email,
    phoneNumber,
    description,
    firstName,
    lastName,
    street,
    zipCode,
    country,
    city,
  } = trainerBasics;
  const updatedTrainerRows = (
    await dbConnection.query(
      `UPDATE trainer SET description = ?, ico = ? WHERE uid = ?`,
      [description, ico, uid],
    )
  ).affectedRows;

  const updatedUserRows = (
    await dbConnection.query(
      `UPDATE user SET email = ?, firstName = ?, lastName = ?, phoneNumber = ? WHERE id = ?`,
      [email, firstName, lastName, phoneNumber, uid],
    )
  ).affectedRows;

  const updatedAddressRows = (
    await dbConnection.query(
      `UPDATE Address SET country = ?, zipCode = ?, street = ?, city = ? WHERE uid = ?`,
      [country, zipCode, street, city, uid],
    )
  ).affectedRows;

  return updatedTrainerRows === 1 && updatedUserRows === 1 && updatedAddressRows === 1;
};
