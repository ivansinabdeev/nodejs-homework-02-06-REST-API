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
});

module.exports = joiContactSchema;
