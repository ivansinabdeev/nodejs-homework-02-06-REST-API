const { Contact } = require("../../model");
const { createError } = require("http-errors");

const removeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndRemove(id);
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
