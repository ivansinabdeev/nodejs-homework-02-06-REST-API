const signUp = require("./signUp");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const updateAvatar = require("./updateAvatar");
const verifyUser = require("./verifyUser");
const repeatVerificationUser = require("./repeatVerificationUser");

module.exports = {
  signUp,
  login,
  logout,
  current,
  updateAvatar,
  verifyUser,
  repeatVerificationUser,
};
