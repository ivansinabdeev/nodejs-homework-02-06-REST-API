const { Conflict } = require("http-errors");

const { User } = require("../../model");

const signUp = async (req, res, next) => {
  try {
    const { email, password, subscription, token } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Email in use");
    }

    const newUser = await User.create({ email, password, subscription, token });
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

module.exports = signUp;
