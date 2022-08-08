import {rankingRepository} from "../repositories/ranking.repository.js";

export async function getRanking(_req, res) {
    try {
        const ranking = await rankingRepository.selectRankingData();
        const body = [...ranking.rows];
        return res.status(200).send(body);
    } catch(err) {
        return res.sendStatus(500);
    }
}