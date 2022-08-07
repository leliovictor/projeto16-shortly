import connection from "../config/db.js";

async function insertUrlAtUrls(userId, url, shortUrl) {
  const query = `INSERT INTO urls ("userId", url,"shortUrl") VALUES ($1,$2,$3)`;

  const values = [userId, url, shortUrl];

  return connection.query(query, values);
}

async function selectUrlById(id) {
  const query = `SELECT id,url,"shortUrl" FROM urls WHERE id=$1`;
  const value = [id];

  return connection.query(query, value);
}

async function selectUrlByShortUrl(shortUrl) {
  const query = `SELECT * FROM urls WHERE "shortUrl"=$1`;
  const value = [shortUrl];

  return connection.query(query, value);
}

async function updateUrlVisitCountByOne(id, number) {
  const query = `UPDATE urls SET "visitCount"=$1 WHERE id=$2`;
  const values = [number, id];

  return connection.query(query,values);
}

export const urlsRepository = {
  insertUrlAtUrls,
  selectUrlById,
  selectUrlByShortUrl,
  updateUrlVisitCountByOne,
};
