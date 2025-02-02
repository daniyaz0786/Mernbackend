const addTocarttModel = require("../models/cartProduct");

const addToCardViewController = async (req, res) => {
    try {
        const currentUser = req.userId
        const allProduct = await addTocarttModel.find({
            userId: currentUser
        }).populate("productId")
        res.json({
            data: allProduct,
            error: false,
            success: true,
        });

    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false,
        });
    }
}
module.exports = addToCardViewController;