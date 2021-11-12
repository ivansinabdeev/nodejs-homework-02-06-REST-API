const express = require("express");
const router = express.Router();

// const contacts = require("../../model/contacts.json");
const contactsOperations = require("../../model/index");

router.get("/", async (req, res) => {
  const contacts = await contactsOperations.listContacts();
  res.json(contacts);
});

router.get("/:id", async (req, res, next) => {
  res.json(contacts[0]);
});

router.post("/", async (req, res, next) => {
  res.json(contacts);
});

router.delete("/:id", async (req, res, next) => {
  res.json(contacts);
});

router.post("/:id", async (req, res, next) => {
  res.json(contacts);
});

module.exports = router;
