const express = require("express");
const router = express.Router();

const { validation, authentication } = require("../../middlewares");
const { joiContactSchema } = require("../../validations");
const { contacts: ctrl } = require("../../controllers");

router.get("/", authentication, ctrl.getAll);

router.get("/:id", authentication, ctrl.getById);

router.post("/", authentication, validation(joiContactSchema), ctrl.add);

router.put(
  "/:id",
  authentication,
  validation(joiContactSchema),
  ctrl.updateById
);

router.delete("/:id", authentication, ctrl.removeById);

router.patch(
  "/:id/favorite",
  authentication,
  validation(joiContactSchema),
  ctrl.favorite
);

module.exports = router;
