const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");

const getUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });

    if (!user) {
      res.status(202).json("user not found");
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        res.status(200).json({ msg: "Present user", token, expiresIn: "1h" });
      } else {
        res.status(201).json("Wrong password");
      }
    }
  } catch (error) {
    res.json(error);
  }
};

const createUser = async (req, res) => {
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
};

module.exports = { getUser, createUser };
