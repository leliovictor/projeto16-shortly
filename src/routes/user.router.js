import { Router } from "express";

import { checkAuthentication } from "../middlewares/token.middleware.js";

import * as controller from "../controllers/user.controller.js";
import * as middleware from "../middlewares/user.middleware.js";


const userRouter = Router();

userRouter.get(
  "/users/me",
  checkAuthentication,
  middleware.getUserData,
  middleware.getUserUrls,
  controller.getBindData
  );

export default userRouter;
