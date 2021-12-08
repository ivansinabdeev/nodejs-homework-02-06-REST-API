const gravatar = require("gravatar");

const { Contact } = require("../../model");

const add = async (req, res, next) => {
  try {
    const avatar = gravatar.url("ivan@gmail.com");
    const newContact = { ...req.body, owner: req.user._id };
    const contact = await Contact.create({ ...newContact, avatar });
    res.status(201).json({
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

module.exports = add;
