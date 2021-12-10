const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { User } = require("../../model");
const { sendLetter } = require("../../validations/mailTransporter");

const signUp = async (req, res, next) => {
  try {
    const { email, password, subscription, token } = req.body;
    const avatarURL = gravatar.url(email);
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
    const confirmationLetter = {
      to: email,
      subject: "Подтверждение регистрации",
      text: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Нажмите для подтверждения email</a>`,
    };

    await sendLetter(confirmationLetter);
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
