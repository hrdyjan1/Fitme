import * as argon2 from "argon2";
import {uuidv4} from "./uuid";
import {checkIfValidEmail} from "./checkIfValidEmail";
import {createToken} from "../libs/token";

async function generalSignup(dbConnection, email, password, firstName, lastName, type) {
    await checkIfValidEmail(dbConnection, email);
    const id = uuidv4();
    const verificationToken = uuidv4();
    const hashedPassword = await argon2.hash(password);
    const token = createToken({ id });

    await dbConnection.query(
        `INSERT INTO user (id, email, firstName, lastName, password, verificationToken, verified, lockedToken, type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
            id,
            email,
            firstName,
            lastName,
            hashedPassword,
            verificationToken,
            0,
            '',
            type,
        ],
    );

    await dbConnection.query(
        `INSERT INTO Address (uid)
      VALUES (?);`,
        [id],
    );

    return { id, verificationToken, token };
}

export { generalSignup };

