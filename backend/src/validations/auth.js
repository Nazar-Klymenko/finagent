import Joi from "joi";

const AdminSchema = Joi.object({
  name: Joi.string().required().trim().max(24),
  surname: Joi.string().required().trim().max(40),
  email: Joi.string()
    .email({ tlds: { allow: true } })
    .required()
    .lowercase(),
  phone: Joi.string().required(),
  isActive: Joi.bool().default(false),
  isApproved: Joi.bool().default(false),
  secret: Joi.string().max(64),
  role: Joi.string().default("admin"),
});

const UserSchema = Joi.object({
  name: Joi.string().required().trim().max(24),
  surname: Joi.string().required().trim().max(40),
  email: Joi.string()
    .email({ tlds: { allow: true } })
    .required()
    .lowercase(),
  phone: Joi.string().required(),
  language: Joi.string().trim(),
  isActive: Joi.bool().default(false),
  isApproved: Joi.bool().default(false),
  secret: Joi.string().max(64),
  role: Joi.string().default("admin"),
});

export { AdminSchema, UserSchema };
