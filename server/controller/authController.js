const User = require("../model/userModel");
const ResetToken = require("../model/tokenModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const resetToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(202).json({ message: "User not found" });
    } else {
      const findUser = await ResetToken.findOne({ userId: user._id });
      const token = resetToken(user._id);

      if (findUser) {
        findUser.token = token;
        findUser.used = false;
        await findUser.save();
      } else {
        const result = await ResetToken.create({
          userId: user._id,
          token: token,
          used: false,
        });
      }

      const resetLink = `${process.env.CLIENT_URL}/user/resetPassword/${token}`;

      const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.user,
        to: email,
        subject: "Password Reset",
        html: `Hi ${user.name}, <br><br> Click the below link to reset your password: <br><br> <a href='${resetLink}'>${resetLink}</a> <br><br> Have a good day!!`,
      };

      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "Failed to send password reset email" });
        } else {
          return res
            .status(200)
            .json({ message: "Password reset link sent", token });
        }
      });
    }
  } catch (error) {
    res.json(error);
    // console.log(error);
  }
};

module.exports = { forgotPassword };
