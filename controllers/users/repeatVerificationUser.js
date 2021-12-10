const { NotFound, BadRequest } = require("http-errors");

const { sendLetter } = require("../../validations/mailTransporter");

const repeatVerificationUser = async (req, res) => {
  const { email } = req.body;

  const currentUser = await User.findOne(email);

  if (!currentUser) {
    throw new NotFound("User not found");
  }

  if (!currentUser.verifyToken || currentUser.verifyToken.length < 1) {
    throw new BadRequest("Verification has already been passed");
  }

  const confirmationLetter = {
    to: email,
    subject: "Подтверждение регистрации",
    text: `<a href="http://localhost:3000/api/users/verify/${currentUser.verifyToken}">Нажмите для подтверждения email</a>`,
  };

  await sendLetter(confirmationLetter);

  res.json({
    status: "OK",
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = repeatVerificationUser;
