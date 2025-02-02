const addTocarttModel = require("../models/cartProduct");

const addToCartController = async (req, res) => {
    try {
        const { productId } = req?.body;
        const currentUser = req.userId;

        const isProductAvailable = await addTocarttModel.findOne({ productId });

        if (isProductAvailable) {
            return res.json({
                message: "Already Exist Add To cart",
                success: false,
                error: true
            })
        }

        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser,
        }

        const newAddToCart = new addTocarttModel(payload);
        const saveProduct = await newAddToCart.save()


        res.json({
            data: saveProduct,
            message: "Product Added in Cart ",
            success: true,
            error: false
        })

    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false,
        });
    }
}
module.exports = addToCartController;