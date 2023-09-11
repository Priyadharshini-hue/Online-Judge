const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const userModel = require("../../model/userModel");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });

    if (!user) {
      res.status(202).json("User not found");
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        res.status(200).json("Present user");
      } else {
        res.status(201).json("wrong password");
      }
    }
  } catch (error) {
    res.json(err);
  }
});

module.exports = router;
