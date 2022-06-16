const { NotFound } = require("http-errors");
const { User } = require("../../model");

const verifyUser = async (req, res) => {
  const { verificationToken } = req.params;
  const verifiedUser = await User.findOne(verificationToken, {
    _id: 0,
    password: 0,
    token: 0,
  });

  if (!verifiedUser) {
    throw new NotFound("User not found");
  }

  await User.findByIdAndUpdate(verifiedUser._id, {
    verifyToken: null,
    verify: true,
  });

  res.json({
    status: "OK",
    code: 200,
    message: "Verification successful",
  });
};

module.exports = verifyUser;
