const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { User } = require("../model");

const { SECRET_KEY } = process.env;

const authentication = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(" ");
    if (bearer !== "Bearer") {
      throw new Unauthorized();
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id, "_id email subscription");
      if (!user) {
        throw new Unauthorized("Not authorized");
      }
      if (!user.token) {
        throw new Unauthorized();
      }
      req.user = user;
      next();
    } catch (error) {
      throw new Unauthorized(error.message);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
