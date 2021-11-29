const { Contact } = require("../../model");

const add = async (req, res, next) => {
  try {
    const contactNew = await Contact.create(req.body);
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
};

module.exports = add;
