const Joi = require("joi");

const joiUserSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ru"] },
    })
    .required(),

  password: Joi.string().required(),

  subscription: Joi.string(),

  token: Joi.string(),

  // owner: Joi.string(),
});

module.exports = joiUserSchema;
