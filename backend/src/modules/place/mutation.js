import { uuidv4 } from '../../constants/uuid';

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

export const removePlace = async (_, { id }, { dbConnection }) => {
  const errorsStatus = (
    await dbConnection.query(`DELETE FROM place WHERE id = ?`, [id])
  ).warningStatus;

  return errorsStatus === 0;
};

export const updatePlace = async (_, { id, name, description, latitude, longitude }, { dbConnection }) => {
    const updatedRows = (await dbConnection.query(
      `UPDATE place SET name = ?, description = ?, latitude = ?, longitude = ?
       WHERE id = ?`,
      [
        name,
        description,
        latitude,
        longitude,
        id
      ],
    )).affectedRows
  
    return updatedRows === 1;
  };
  
