const userModel = require("../models/userModel");

async function updateUser(req, res) {
  try {
    const sessionUser = req.userId;
    const { userId, email, name, role } = req.body; // Destructure req.body as an object

    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };

    const user = await userModel.findById(sessionUser);

    // console.log("user.role", user.role);

    // Use the payload to update the user
    const updatedUser = await userModel.findByIdAndUpdate(userId, payload, {
      new: true,
    });

    res.json({
      data: updatedUser,
      message: "User Updated",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = updateUser;
