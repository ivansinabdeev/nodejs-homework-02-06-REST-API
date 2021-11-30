const { Conflict } = require("http-errors");

const { User } = require("../../model");

const singUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Email in use");
    }

    const newUser = await User.create({ email, password });
    res.status(201).json({
      status: "success",
      code: 201,
      user: {
        result: newUser,
        message: "Register success",
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = singUp;
