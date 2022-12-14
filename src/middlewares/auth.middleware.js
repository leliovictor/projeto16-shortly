import bcrypt from "bcrypt";

import { globalRepository } from "../repositories/global.repository.js";

export async function checkEmailDuplicate(_req, res, next) {
  const { email } = res.locals.body;

  try {
    const checkDuplicate = await globalRepository.selectUserByEmail(email);
    if (checkDuplicate.rowCount !== 0)
      return res.status(409).send("Email already in use");
  } catch (err) {
    return res.sendStatus(500);
  }
  next();
}

export async function checkEmail(_req, res, next) {
  const { email } = res.locals.body;

  try {
    const user = await globalRepository.selectUserByEmail(email);
    if (user.rowCount !== 1)
      return res.status(401).send("E-mail or Password incorrect!");

    res.locals.user = user.rows[0];
  } catch (err) {
    return res.sendStatus(500);
  }
  next();
}

export async function checkPassword(_req, res, next) {
  const { password } = res.locals.body;
  const { passwordCript } = res.locals.user;

  const confirmPassword = bcrypt.compareSync(password, passwordCript);

  if (!confirmPassword)
    return res.status(401).send("E-mail or Password incorrect!");

  next();
}
