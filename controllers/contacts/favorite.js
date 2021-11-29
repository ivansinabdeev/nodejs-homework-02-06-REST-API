const { Contact } = require("../../model");
const { createError } = require("http-errors");

const favorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndUpdate(
      id,
      { favorite },
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
