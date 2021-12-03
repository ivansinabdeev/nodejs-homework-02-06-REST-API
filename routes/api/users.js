const express = require("express");

const { validation } = require("../../middlewares");
const { joiUserSchema } = require("../../validations");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiUserSchema), ctrl.signUp);

router.post("/login", validation(joiUserSchema), ctrl.login);

module.exports = router;
