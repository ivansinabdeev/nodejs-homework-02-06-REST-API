const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { User } = require("../model");

const { SECRET_KEY } = process.env;

const authentication = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(" ");
    const { id } = jwt.verify(token, SECRET_KEY);
    let user;

    if (!req.headers.authorization) {
      throw new badRequest("");
    }
    if (bearer === "Bearer" && token) {
      user = await User.findById(id);
    }
    if (user && user.token === token) {
      req.user = user;
      next();
    } else {
      throw new Unauthorized("Not found");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
