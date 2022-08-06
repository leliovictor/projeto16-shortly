import { Router } from "express";

import { validateSchemaMiddleware } from "../middlewares/schema.middleware.js";

import * as controller from "../controllers/auth.controller.js";
import * as middleware from "../middlewares/auth.middleware.js";
import * as schema from "../schemas/auth.schema.js";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateSchemaMiddleware(schema.signUp),
  middleware.checkEmailDuplicate,
  controller.postSignUp
);

export default authRouter;
