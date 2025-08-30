const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token; // cookie me token check karna

    if (!token) {
      return res.status(401).json({
        message: "Please login first!",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: "Invalid or expired token",
          error: true,
          success: false,
        });
      }

      req.userId = decoded._id; // userId ko request me attach karna
      next();
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Auth error",
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
