const express = require("express");

const { validation, upload, authentication } = require("../../middlewares");
const { joiUserSchema } = require("../../validations");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiUserSchema), ctrl.signUp);

router.post("/login", validation(joiUserSchema), ctrl.login);

router.get("/logout", authentication, ctrl.logout);

router.get("/current", authentication, ctrl.current);

router.patch(
  "/avatars",
  upload.single("avatarURL"),
  authentication,
  ctrl.updateAvatar
);

module.exports = router;
