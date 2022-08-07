import jwt from "jsonwebtoken";

import { globalRepository } from "../repositories/global.repository.js";

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