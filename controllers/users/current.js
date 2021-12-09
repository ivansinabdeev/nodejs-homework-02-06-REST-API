const { User } = require("../../model");

const current = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const currentUser = await User.findById(_id, "email subscription");
    res.json({
      currentUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = current;
