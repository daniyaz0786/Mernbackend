const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Please Provide email");
    }
    if (!password) {
      throw new Error("Please Provide password");
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User Not Found!");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    // console.log("checkPassword", checkPassword);

    // If the password is incorrect
    if (!checkPassword) {
      throw new Error("Password Doesn't Match!");
    }

    // If the password is correct, generate a token
    const tokenData = {
      _id: user._id,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
      expiresIn: 60 * 60 * 8, // Token expiration time
    });

    // console.log("Generated Token:", token);

    const tokenOption = {
      httpOnly: true,
      secure: true, // Ensure secure cookie in production
    };
    res.cookie("token", token, tokenOption).json({
      message: "Login Successfully",
      data: token,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;
