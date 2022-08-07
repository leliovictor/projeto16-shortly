import connection from "../config/db.js";

async function selectUserByEmail(email) { 
    const query = `SELECT * FROM users WHERE email=$1`;
    
    const value = [email];
    
    return connection.query(query,value);
}

async function insertUserAtUsers(name, email, passwordCript) {
    const query = `INSERT INTO users (name, email, "passwordCript") VALUES ($1,$2,$3)`;

    const values = [name, email, passwordCript];

    return connection.query(query, values);
}

export const authRepository = {
    selectUserByEmail,
    insertUserAtUsers
};