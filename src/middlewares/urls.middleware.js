import jwt from "jsonwebtoken";

import { globalRepository } from "../repositories/global.repository.js";
import { urlsRepository } from "../repositories/urls.repository.js";

export async function checkAuthentication(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(401).send("Miss token from headers");

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);

    res.locals.data = data;
  } catch (err) {
    return res.status(401).send("Invalid token");
  }

  next();
}

export async function getUser(_req, res, next) {
  const { email } = res.locals.data;

  try {
    const user = await globalRepository.selectUserByEmail(email);
    if (user.rowCount !== 1) return res.status(404).send("User not found");

    res.locals.user = user.rows[0];
  } catch (err) {
    return res.sendStatus(500);
  }

  next();
}

export async function checkUrlById(req, res, next) {
  const { id } = req.params;

  try {
    const url = await urlsRepository.selectUrlById(id);
    if (url.rowCount === 0) return res.status(404).send("Url not found");

    res.locals.url = url.rows[0];
  } catch (err) {
    return res.sendStatus(500);
  }

  next();
}

export async function checkUrlByShortUrl(req, res, next) {
  const { shortUrl } = req.params;

  try {
    const url = await urlsRepository.selectUrlByShortUrl(shortUrl);
    if (url.rowCount === 0) return res.status(404).send("Url not found");
    res.locals.url = url.rows[0];
  } catch (err) {
    return res.sendStatus(500);
  }

  next();
}

export async function increaseUrlVisitCount(_req, res, next) {
  const { id, visitCount } = res.locals.url;
  
  try {
    const increaseOne = visitCount + 1;
    await urlsRepository.updateUrlVisitCountByOne(id, increaseOne);
  } catch (err) {
    return res.sendStatus(500);
  }
  next();
}

export async function changeProtocolUrl(_req, res, next) {
    let { url } = res.locals.url;

    if(url.slice(0,4) !== "http") {
        url = `https://${url}`;
    };
    
    res.locals.pageUrl = url;
    next();
}
