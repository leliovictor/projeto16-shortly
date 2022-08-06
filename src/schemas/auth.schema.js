import joi from "joi";

const signUp = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref('password')
});

const signIn = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export {signIn, signUp};