const Joi = require("joi");

const joiContactSchema = Joi.object({
  name: Joi.string().min(2).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ru"] },
    })
    .required(),

  phone: Joi.string().required(),

  owner: Joi.string(),

  avatarURL: Joi.string(),
});

module.exports = joiContactSchema;
