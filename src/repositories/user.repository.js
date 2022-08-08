import connection from "../config/db.js";

async function selectUserData(email) {
  const query = `
    SELECT users.id, users.name, SUM(urls."visitCount") AS "visitCount" 
    FROM users
    JOIN urls ON users.id = urls."userId"
    WHERE users.email=$1
    GROUP BY users.id
  `;
  const value = [email];

  return connection.query(query, value);
}

async function selectAllUserUrls(userId) {
  const query = `
    SELECT id,"shortUrl",url,"visitCount" 
    FROM urls 
    WHERE "userId"=$1
    ORDER BY id ASC
    `;
  const value = [userId];

  return connection.query(query, value);
}

export const userRepository = {
  selectUserData,
  selectAllUserUrls,
};
