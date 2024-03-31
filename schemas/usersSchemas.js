import Joi from "joi";
import { emailRegepxp, subList } from "../constants/user-constants.js";

export const userRegisterSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegepxp).required(),
  subscription: Joi.string().valid(...subList),
  token: Joi.string,
});

export const userLoginSchema = Joi.object({
  password: Joi.string(),
  email: Joi.string(),
});

export const userSubSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subList)
    .required(),
});
