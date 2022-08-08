import { Router } from "express";

import { validateSchemaMiddleware } from "../middlewares/schema.middleware.js";
import { checkAuthentication } from "../middlewares/token.middleware.js";

import * as controller from "../controllers/urls.controller.js";
import * as middleware from "../middlewares/urls.middleware.js";
import * as schema from "../schemas/urls.schema.js";

const urlsRouter = Router();

urlsRouter.post(
  "/urls/shorten",
  validateSchemaMiddleware(schema.urls),
  checkAuthentication,
  middleware.getUser,
  controller.postUrlsShorten
);
urlsRouter.get("/urls/:id", middleware.checkUrlById, controller.getUrl);
urlsRouter.get(
  "/urls/open/:shortUrl",
  middleware.checkUrlByShortUrl,
  middleware.increaseUrlVisitCount,
  middleware.changeProtocolUrl,
  controller.redirectPageToUrl
);
urlsRouter.delete(
  "/urls/:id",
  checkAuthentication,
  middleware.getUrlById,
  middleware.compareUserEmail,
  controller.deleteUrl
);

export default urlsRouter;
