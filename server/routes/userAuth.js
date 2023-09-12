const express = require("express");

const { getUser, createUser } = require("../controller/userController");

const router = express.Router();

router.post("/user/signIn", getUser);
router.post("/user/signUp", createUser);

module.exports = router;
