const { User } = require("../../model");
const fs = require("fs/promises");
const path = require("path");
const { createError } = require("http-errors");

const avatarsDir = path.join(__dirname, "../../public/avatars");

const updateById = async (req, res, next) => {
  try {
    const { path: tempUpload, originalName } = req.file;
    const resultUpload = path.join(avatarsDir, originalName);
    await fs.rename(tempUpload, resultUpload);
    const { contactId } = req.params;
    const { _id: owner } = req.user;
    const avatar = path.join("/avatars", originalName);
    const userAvatar = await User.findOneAndUpdate(
      { _id: contactId, owner },
      { avatar },
      {
        new: true,
      }
    );
    if (!userAvatar) {
      throw new createError(404, "This user does not exist in users");
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        userAvatar,
      },
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    next(error);
  }
};

module.exports = updateById;
