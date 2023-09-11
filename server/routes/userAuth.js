const express = require("express");

const { getUser, createUser } = require("../controller/userController");

const router = express.Router();

router.post("/", getUser);
router.post("/signUp", createUser);

module.exports = router;
