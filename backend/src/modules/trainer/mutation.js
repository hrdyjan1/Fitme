import {EMAIL, sendEmail} from "../../utils/email";
import getUser from '../user/helper'
import {generalSignup} from "../../constants/generalSignup";

export const signupTrainer = async (
  _,
  { firstName, lastName, ico, email, password },
  { dbConnection },
) => {
  const { id, verificationToken, token } = await generalSignup(dbConnection, email, password, firstName, lastName, 'trainer')

  await dbConnection.query(
    `INSERT INTO trainer (uid, ico)
     VALUES (?, ?);`,
    [id, ico],
  );

  const emailText = `Dobrý den, gratulujeme, registrace do systému Fit.me proběhla úspěšně. Zbývá ověřit tuto emailovou adresu \n Váš link pro ověření: \n\n http://frontend.team01.vse.handson.pro/verificationToken=${verificationToken} \n\n\n. Pokud nechcete dostávat další emaily z této adresy klikněte zde:`;
  await sendEmail(EMAIL.header, email, 'Fit.me - Potvrzení registrace do systému', emailText);

  const user = { id, email, firstName, lastName, ico, verified: 0 };

  return { user, token };
};

export const updateTrainer = async (
  _,
  trainerBasics,
  { dbConnection, auth },
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
  let id = uid;
  if (!id) {
    try {
      id = await getUser(auth);
    } catch (error) {
      throw new Error('Session neexistujícího uživatele');
    }
  }
  const updatedTrainerRows = (
    await dbConnection.query(
      `UPDATE trainer SET description = ?, ico = ? WHERE uid = ?`,
      [description, ico, id],
    )
  ).affectedRows;

  const updatedUserRows = (
    await dbConnection.query(
      `UPDATE user SET email = ?, firstName = ?, lastName = ?, phoneNumber = ? WHERE id = ?`,
      [email, firstName, lastName, phoneNumber, id],
    )
  ).affectedRows;

  const updatedAddressRows = (
    await dbConnection.query(
      `UPDATE Address SET country = ?, zipCode = ?, street = ?, city = ? WHERE uid = ?`,
      [country, zipCode, street, city, id],
    )
  ).affectedRows;

  return updatedTrainerRows === 1 && updatedUserRows === 1 && updatedAddressRows === 1;
};
