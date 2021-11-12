const fs = require("fs/promises");
const path = require("path");

const contacts = path.join(__dirname, "../model/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contacts);
  const result = JSON.parse(data);
  return result;
};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
