const express = require("express");
const router = express.Router();

const { validation } = require("../../middlewares");
const { joiContactSchema } = require("../../validations");
const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", validation(joiContactSchema), ctrl.add);

router.put("/:id", validation(joiContactSchema), ctrl.updateById);

router.delete("/:id", ctrl.removeById);

router.patch("/:id/favorite", validation(joiContactSchema), ctrl.favorite);

module.exports = router;
