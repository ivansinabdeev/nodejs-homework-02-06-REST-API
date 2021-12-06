const { Contact } = require("../../model");
const { createError } = require("http-errors");

const favorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id: owner } = req.user;
    const contact = await Contact.findOneAndUpdate(
      { _id: contactId, owner },
      req.body,
      {
        new: true,
      }
    );
    if (!contact) {
      throw new createError(404, "Not found");
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

module.exports = favorite;
