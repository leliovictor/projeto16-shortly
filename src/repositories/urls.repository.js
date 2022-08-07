import connection from "../config/db.js";

async function insertUrlAtUrls(userId, url, shortUrl) {
    const query = `INSERT INTO urls ("userId", url,"shortUrl") VALUES ($1,$2,$3)`;

    const values = [userId, url, shortUrl];

    return connection.query(query, values);
}

async function getUrlById(id) {
    const query = `SELECT id,url,"shortUrl" FROM urls WHERE id=$1`;
    const value = [id];

    return connection.query(query, value);
}


export const urlsRepository = {
    insertUrlAtUrls,
    getUrlById
};