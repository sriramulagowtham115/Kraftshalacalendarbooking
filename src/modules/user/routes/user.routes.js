const express = require("express");
const router = express.Router();
const controller = require("../interface/user.controller");

router.post("/", controller.createUser);
router.get("/:id", controller.getUser);

module.exports = router;
