const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const userModel = require("../../model/userModel");

router.post("/signUp", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (user) {
      res.status(201).json("Present user");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await userModel.create({
        name,
        email,
        password: hashedPassword,
      });

      res.status(200).json("New user");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
