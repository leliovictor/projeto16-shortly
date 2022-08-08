import connection from "../config/db.js";

async function selectRankingData() {
  const query = `
          SELECT 
              users.id, 
              users.name, 
              COUNT(urls."userId") AS "linksCount", 
              SUM(urls."visitCount") AS "visitCount"
          FROM users
          JOIN urls ON users.id = urls."userId"
          GROUP BY users.id
          ORDER BY "visitCount" DESC
          LIMIT 10
      `;
  return connection.query(query);
}

export const rankingRepository = {
  selectRankingData,
};
