import { uuidv4 } from '../../constants/uuid';
import { EMAIL, sendEmail } from '../../utils/email';
import getUser from "../user/helper";
import {Cloudinary} from "../../utils/cloudinary";
import { generalSignup } from "../../constants/generalSignup";

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
    //TODO: will be changed to proper address for LAST SPRINT
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
  { dbConnection },
) => {
  const { id, verificationToken, token } = await generalSignup(dbConnection, email, password, firstName, lastName, 'place');

  await dbConnection.query(
    `INSERT INTO place (id, uid, name, ico)
      VALUES (?, ?, ?, ?);`,
    [uuidv4(), id, name, ico],
  );

  const emailText = `(Micha)Link pro overeni: \n\n http://frontend.team01.vse.handson.pro/verificationToken=${verificationToken} \n\n\n Pokud nechcete dostavat dalsi emaily z teto adresy kliknete zde:`;
  await sendEmail(EMAIL.header, email, 'Gratuluji', emailText);

  const user = { id, email, firstName, lastName, verified: 0 };

  return { user, token };
};

export const deletePlaceImage = async (_, { iid }, { dbConnection }) => {

  const deletePlaceImageQuery = 'DELETE FROM placeGallery WHERE iid = ?;';

  const errorsStatus = (
    await dbConnection.query(deletePlaceImageQuery, [iid])
  ).warningStatus;

  return errorsStatus === 0;
};

export const uploadPlaceImage = async (_, { file }, ctx) => {
  const { auth, dbConnection } = ctx;
  try {
    const id = await getUser(auth);
    const insertImageURLQuery = 'INSERT INTO placeGallery (uid, imageURL) VALUES (?, ?);';

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
// //DEPRECATED - DELETE
// export const addTag = async (_, { name }, { dbConnection, auth }) => {
//
//   let id = null;
//   try {
//     id = await getUser(auth);
//   } catch  (error){
//     throw new Error('Session neexistujícího uživatele');
//   }
//
//   try {
//     const insertTagQuery = 'INSERT INTO tag (uid, name) VALUES (?, ?);';
//
//     if (id) {
//       await dbConnection.query(insertTagQuery, [id, name])
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     return false;
//   }
// };
//
// export const deleteTag = async (_, { name }, { dbConnection, auth }) => {
//   let id = null;
//   try {
//     id = await getUser(auth);
//   } catch  (error){
//     throw new Error('Session neexistujícího uživatele');
//   }
//
//   try {
//     const deleteTagQuery = 'DELETE FROM tag WHERE uid = ? AND name = ?;';
//
//     if (id) {
//       await dbConnection.query(deleteTagQuery, [id, name])
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     return false;
//   }
// };

//TODO:-------SOLUTION FOR LAST SPRINT------
export const addSportType = async (_, stid, {dbConnection, auth}) => {

  let id = null;
  try {
    id = await getUser(auth);
  } catch  (error){
    throw new Error('Session neexistujícího uživatele');
  }

  try {
    const insertSportTypeQuery = 'INSERT INTO userSportType (uid, stid) VALUES (?, ?);';

    if (id) {
      await dbConnection.query(insertSportTypeQuery, [id, stid])
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
//TODO:-------SOLUTION FOR LAST SPRINT------
export const removeSportType = async (_, stid, {dbConnection, auth}) => {

  let id = null;
  try {
    id = await getUser(auth);
  } catch  (error){
    throw new Error('Session neexistujícího uživatele');
  }

  try {
    const removeSportTypeQuery = 'DELETE FROM userSportType WHERE uid = ? AND stid = ?;';
    if (id) {
      await dbConnection.query(removeSportTypeQuery, [id, stid])
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const removeTrainer = async (_, tid, {dbConnection, auth}) => {

  let id = null;
  try {
    id = await getUser(auth);
  } catch  (error){
    throw new Error('Session neexistujícího uživatele');
  }

  try {
    const removeTrainerQuery = 'DELETE FROM placeTrainer WHERE pid = ? AND tid = ?;';
    if (id) {
      await dbConnection.query(removeTrainerQuery, [id, tid])
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const addTrainer = async (_, tid, {dbConnection, auth}) => {

  let id = null;
  try {
    id = await getUser(auth);
  } catch  (error){
    throw new Error('Session neexistujícího uživatele');
  }

  try {
    const insertTrainerQuery = 'INSERT INTO placeTrainer (pid, tid) VALUES (?, ?);';

    if (id) {
      await dbConnection.query(insertTrainerQuery, [id, tid])
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

