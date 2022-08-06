import { authRepositories } from "../repositories/auth.repository.js";

export async function checkEmailDuplicate(_req, res, next) {
  const { email } = res.locals.body;

  const checkDuplicate = await authRepositories.selectUserByEmail(email);
  if (checkDuplicate.rowCount !== 0)
    return res.status(409).send("Email already in use");

  next();
}
