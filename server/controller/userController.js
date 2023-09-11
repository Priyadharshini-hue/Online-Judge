const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const getUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });

    if (!user) {
      res.status(202).json("user not found");
    } else {
      const passwordMatch = bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = createToken(user._id);
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
    const existingNameUser = await userModel.findOne({ name });

    const existingEmailUser = await userModel.findOne({ email });

    if (existingNameUser) {
      res.status(201).json("Username already exists");
    } else if (existingEmailUser) {
      res.status(201).json("Email already exists");
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
