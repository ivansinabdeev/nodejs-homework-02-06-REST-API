const express = require("express");
const router = express.Router();
const { createError, BadRequest } = require("http-errors");
const Joi = require("joi");

const joiSchema = Joi.object({
  name: Joi.string().min(2).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ru"] },
    })
    .required(),

  phone: Joi.string().required(),
});

const contactsOperations = require("../../model/index");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsOperations.getContactById(id);
    if (!contact) {
      throw new createError(404, "This contact does not exist in contacts");
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const contactNew = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 200,
      data: {
        contactNew,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { id } = req.params;
    const contact = await contactsOperations.updateContact(id, req.body);
    if (!contact) {
      throw new createError(404, "This contact does not exist in contacts");
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsOperations.removeContact(id);
    if (!contact) {
      throw new createError(404, "Not found");
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
