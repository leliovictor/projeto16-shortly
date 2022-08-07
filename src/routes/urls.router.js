import { Router } from "express";

import { validateSchemaMiddleware } from "../middlewares/schema.middleware.js";

import * as controller from "../controllers/urls.controller.js";
import * as middleware from "../middlewares/urls.middleware.js";
import * as schema from "../schemas/urls.schema.js";

const urlsRouter = Router();

urlsRouter.post(
  "/urls/shorten",
  validateSchemaMiddleware(schema.urls),
  middleware.checkAuthentication,
  middleware.getUser,
  controller.postUrlsShorten
);

export default urlsRouter;
