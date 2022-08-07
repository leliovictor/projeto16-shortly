import connection from "../config/db.js";

async function insertUrlAtUrls(userId, url, shortUrl) {
    const query = `INSERT INTO urls ("userId", url,"shortUrl") VALUES ($1,$2,$3)`;

    const values = [userId, url, shortUrl];

    return connection.query(query, values);
}

export const urlsRepository = {
    insertUrlAtUrls
};