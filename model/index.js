const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const result = JSON.parse(data);
  return result;
};

const updateContacts = async (newContacts) => {
  const contactsStr = JSON.stringify(newContacts);
  await fs.writeFile(contactsPath, contactsStr);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const [result] = contacts.filter(
    (contact) => String(contact.id) === String(contactId)
  );
  if (!result) {
    return null;
  }
  return result;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 11));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const [result] = contacts.filter(
    (contact) => String(contact.id) === String(contactId)
  );
  if (!result) {
    return null;
  }
  contacts[result] = { ...body, contactId };
  await updateContacts(contacts);
  return contacts[result];
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(
    (contact) => String(contact.id) === String(contactId)
  );
  if (idx === -1) {
    return null;
  }
  const removeContact = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removeContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
