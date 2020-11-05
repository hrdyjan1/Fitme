import { createToken } from '../../libs/token';
import { uuidv4 } from '../../constants/uuid';
import { checkIfValidEmail } from '../../constants/checkIfValidEmail';

export const signin = async (_, { email, password }, { dbConnection }) => {
  const user = (
    await dbConnection.query(`SELECT * FROM user WHERE email = ? AND password = ?`, [email, password])
  )[0];

  console.log(user)
  if(user) {
      const token = createToken(user);
      return { user: user, token: token };
  }

  throw new Error('Invalidní hodnoty.');
};

export const signup = async (
  _,
  { firstName, lastName, email, password },
  { dbConnection },
) => {
  await checkIfValidEmail(email, dbConnection);
  const id = uuidv4();
  const verificationToken = uuidv4();

  await dbConnection.query(
    `INSERT INTO user (id, email, firstName, lastName, password, verificationToken, verified)
      VALUES (?, ?, ?, ?, ?, ?, ?);`,
    [id, email, firstName, lastName, password, verificationToken, 0],
  );

  const user = { id, email, firstName, lastName, verified: 0 };
  const token = createToken({ id });

  return { user, token };
};
