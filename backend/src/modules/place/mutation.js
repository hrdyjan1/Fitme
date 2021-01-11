import { uuidv4 } from '../../constants/uuid';
import { EMAIL, sendEmail } from '../../utils/email';
import getUser from '../user/helper';
import { Cloudinary } from '../../utils/cloudinary';
import { generalSignup } from '../../constants/generalSignup';

export const updatePlaceBasics = async (
  _,
  {
    id,
    uid,
    firstName,
    lastName,
    name,
    ico,
    email,
    phoneNumber,
    description,
    street,
    city,
    zipCode,
    country,
  },
  { dbConnection },
) => {
  const updatedPlaceRows = (
    await dbConnection.query(
      `UPDATE place SET name = ?, description = ?, ico = ? WHERE id = ?`,
      [name, description, ico, id],
    )
  ).affectedRows;

  const updatedUserRows = (
    await dbConnection.query(
      `UPDATE user SET firstName = ?, lastName = ?, email = ?, phoneNumber = ? WHERE id = ?`,
      [firstName, lastName, email, phoneNumber, uid],
    )
  ).affectedRows;

  const updatedAddressRows = (
    await dbConnection.query(
      `UPDATE Address SET country = ?, zipCode = ?, street = ?, city = ? WHERE uid = ?`,
      [country, zipCode, street, city, uid],
    )
  ).affectedRows;

  return (
    updatedPlaceRows === 1 && updatedUserRows === 1 && updatedAddressRows === 1
  );
};

export const signupPlace = async (
  _,
  { firstName, lastName, ico, name, email, password },
  { dbConnection },
) => {
  const { id, verificationToken, token } = await generalSignup(
    dbConnection,
    email,
    password,
    firstName,
    lastName,
    'place',
  );

  await dbConnection.query(
    `INSERT INTO place (id, uid, name, ico)
      VALUES (?, ?, ?, ?);`,
    [uuidv4(), id, name, ico],
  );

  const emailText = `Dobrý den, gratulujeme, registrace do systému Fit.me proběhla úspěšně. Zbývá ověřit tuto emailovou adresu \n Váš link pro ověření: \n\n http://frontend.team01.vse.handson.pro/verificationToken=${verificationToken} \n\n\n. Pokud nechcete dostávat další emaily z této adresy klikněte zde:`;
  await sendEmail(EMAIL.header, email, 'Fit.me - Potvrzení registrace do systému', emailText);

  const user = { id, email, firstName, lastName, verified: 0 };

  return { user, token };
};

export const deletePlaceImage = async (_, { iid }, { dbConnection }) => {
  const deletePlaceImageQuery = 'DELETE FROM placeGallery WHERE iid = ?;';

  const errorsStatus = (await dbConnection.query(deletePlaceImageQuery, [iid]))
    .warningStatus;

  return errorsStatus === 0;
};

export const uploadPlaceImage = async (_, { file }, ctx) => {
  const { auth, dbConnection } = ctx;
  try {
    const id = await getUser(auth);
    const insertImageURLQuery =
      'INSERT INTO placeGallery (uid, imageURL) VALUES (?, ?);';

    if (id) {
      const { url } = await Cloudinary.v2.uploader.upload(file);
      await dbConnection.query(insertImageURLQuery, [id, url]);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const removeTrainer = async (_, { tid }, { dbConnection, auth }) => {
  let id = null;
  try {
    id = await getUser(auth);
  } catch (error) {
    throw new Error('Session neexistujícího uživatele');
  }

  try {
    const removeTrainerQuery =
      'DELETE FROM placeTrainer WHERE pid = ? AND tid = ?';
    if (id) {
      await dbConnection.query(removeTrainerQuery, [id, tid]);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const addTrainer = async (_, { tid }, { dbConnection, auth }) => {
  let id = null;
  try {
    id = await getUser(auth);
  } catch (error) {
    throw new Error('Session neexistujícího uživatele');
  }

  try {
    const insertTrainerQuery =
      'INSERT INTO placeTrainer (pid, tid) VALUES (?, ?);';

    if (id) {
      await dbConnection.query(insertTrainerQuery, [id, tid]);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
