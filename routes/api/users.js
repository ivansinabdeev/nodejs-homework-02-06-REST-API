const express = require("express");

const { validation } = require("../../middlewares");
const { joiUserSchema } = require("../../validations/users");
const { users: ctrl } = require("../../controllers");


const router = express.Router();

router.post("/signup", validation(joiUserSchema), ctrl.signUp);

module.exports = router;
