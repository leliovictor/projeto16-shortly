import { userRepository } from "../repositories/user.repository.js";

export async function getUserData(_req, res, next) {
  const { email } = res.locals.data;

  try {
    const userData = await userRepository.selectUserData(email);
    if(userData.rowCount === 0) return res.status(404).send("User not found");
    res.locals.userData = userData.rows[0];
  } catch (err) {
    return res.sendStatus(500);
  }

  next();
}

export async function getUserUrls(_req, res, next) {
    const {id:userId} = res.locals.userData;

    try {
        const allUserUrls = await userRepository.selectAllUserUrls(userId);
        res.locals.shortenedUrls = [...allUserUrls.rows];
    } catch (err) {
        return res.sendStatus(500);
    }
    next();
}