import { Router } from "express";

import * as controller from "../controllers/ranking.controller.js";

const rankingRouter = Router();

rankingRouter.get("/ranking",controller.getRanking);

export default rankingRouter;