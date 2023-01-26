import Joi from "joi";

export const signUpSchema = Joi.object({
    email: Joi.string().required().max(25),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required()
});