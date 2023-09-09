const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const UserAccount = require("../../model/UserAccount");

router.post("/signUp", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await UserAccount.findOne({ email });

    if (user) {
      res.status(201);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await UserAccount.create({
        name,
        email,
        password: hashedPassword,
      });

      res.status(200);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
