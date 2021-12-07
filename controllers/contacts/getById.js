const { Contact } = require("../../model");
const { createError } = require("http-errors");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id: owner } = req.user;
    const contact = await Contact.findOne(
      { _id: contactId, owner },
      { owner: 0 }
    );
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
};

module.exports = getById;
