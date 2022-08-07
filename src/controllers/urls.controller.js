import { nanoid } from "nanoid";

import { urlsRepository } from "../repositories/urls.repository.js";

export async function postUrlsShorten(_req, res) {
  const { id: userId } = res.locals.user;
  const { url } = res.locals.body;
  const shortUrl = nanoid();

  try {
    await urlsRepository.insertUrlAtUrls(userId, url, shortUrl);

    const body = { shortUrl };
    return res.status(201).send(body);
  } catch (err) {
      console.log(err);
    return res.sendStatus(500);
  }
}
