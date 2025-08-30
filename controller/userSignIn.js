const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) throw new Error("Please Provide email");
    if (!password) throw new Error("Please Provide password");

    const user = await userModel.findOne({ email });
    if (!user) throw new Error("User Not Found!");

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) throw new Error("Password Doesn't Match!");

    const tokenData = { _id: user._id, email: user.email };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "8h", // 8 hours
    });

    const tokenOption = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 8 * 60 * 60 * 1000, // 8 hours
    };

    res.cookie("token", token, tokenOption).json({
      message: "Login Successfully",
      data: { token, userId: user._id },
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Login failed",
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;
