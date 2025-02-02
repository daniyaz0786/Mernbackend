const uploadProductPermission = require("../helper/permission");
const productModel = require("../models/productModel");

async function uploadProductController(req, res) {
    try {

        const sessionUserId = req.userId

        if (!uploadProductPermission(sessionUserId)) {
            throw new error("Permission Denied")
        }




        const uploadProduct =
            new productModel(req.body)
        const saveProduct = await uploadProduct.save()
        res.status(201).json({
            message: "Product Upload Successfully",
            data: saveProduct,
            success: "true",
            error: false,
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = uploadProductController;