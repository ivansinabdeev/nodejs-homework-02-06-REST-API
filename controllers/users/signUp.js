const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { User } = require("../../model");

const signUp = async (req, res, next) => {
  try {
    const avatarURL = gravatar.url("alex@gmail.com");
    const { email, password, subscription, token } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Email in use");
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = await User.create({
      email,
      password: hashPassword,
      subscription,
      token,
      avatarURL,
    });
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
