const { Contact } = require("../../model");
const { createError } = require("http-errors");

const removeById = async (req, res, next) => {
  try {
    // const { id } = req.params;
    const { contactId } = req.params;
    const { _id: owner } = req.user;
    const contact = await Contact.findByIdAndRemove({
      _id: contactId,
      owner,
    });
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
};

module.exports = removeById;
