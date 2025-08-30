const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // yahan tum DB se user validate karte ho
    const user = { _id: "123", email }; // example ke liye

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // local pe false, render pe true
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 din
    });

    res.json({
      message: "Login successful",
      success: true,
      user,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      success: false,
    });
  }
};
