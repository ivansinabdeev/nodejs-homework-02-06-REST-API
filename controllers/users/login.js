const { NotFound, Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../model");

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFound("User not found");
    }
    const compareResult = bcrypt.compareSync(password, user.password);
    if (!compareResult) {
      throw new Unauthorized("Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      status: "success",
      code: 200,
      users: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
