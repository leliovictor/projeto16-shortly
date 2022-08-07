import { customAlphabet } from "nanoid";
import pkg from "nanoid-dictionary";

import { urlsRepository } from "../repositories/urls.repository.js";

export async function postUrlsShorten(_req, res) {
  const { id: userId } = res.locals.user;
  const { url } = res.locals.body;

  const { alphanumeric } = pkg;
  const nanoid = customAlphabet(alphanumeric, 8);
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

export async function getUrl(_req, res) {
  const { url: body } = res.locals;

  return res.status(200).send(body);
}

export async function redirectPageToUrl(_req, res) {
  const { pageUrl } = res.locals;

  return res.status(302).redirect(pageUrl);
}
