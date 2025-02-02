// const userModel = require("../models/userModel")

// const uploadProductPermission = async (userId) => {
//     const user = await userModel.findById(userId)
//     if (user.role !== 'ADMIN') {
//         return false
//     }
//     return false
// }
// module.exports = uploadProductPermission

const userModel = require("../models/userModel");

const uploadProductPermission = async (userId) => {
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return false; // User not found
        }
        if (user.role !== 'ADMIN') {
            return false;
        }
        return true;
    } catch (error) {
        // console.error("Error checking user permissions:", error);
        return false;
    }
};

module.exports = uploadProductPermission;
