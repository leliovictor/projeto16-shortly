import connection from "../config/db.js";

async function insertUserAtUsers(name, email, passwordCript) {
    const query = `INSERT INTO users (name, email, "passwordCript") VALUES ($1,$2,$3)`;

    const values = [name, email, passwordCript];

    return connection.query(query, values);
}

export const authRepository = {
    insertUserAtUsers
};