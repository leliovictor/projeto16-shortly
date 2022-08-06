import bcrypt from "bcrypt";

import { authRepositories } from "../repositories/auth.repository.js";

export async function postSignUp(_req, res) {
    const { name, email, password } = res.locals.body;

    const passwordCript = bcrypt.hashSync(password,10);

    try {
        await authRepositories.insertUserAtUsers(name, email, passwordCript);
        return res.sendStatus(201);
    } catch (err) {
        return res.sendStatus(500);
    }
}