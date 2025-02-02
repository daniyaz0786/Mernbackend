const addToCartModel = require("../models/cartProduct");

const updateAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId; // Assuming middleware attaches `userId` to the request
        const { _id: addToCartProductId, quantity } = req.body; // Destructure fields from the request body

        // Validate required fields
        if (!addToCartProductId || typeof quantity !== "number") {
            return res.status(400).json({
                message: "Invalid product ID or quantity",
                error: true,
                success: false,
            });
        }

        // Update product quantity in the database
        const updateResult = await addToCartModel.updateOne(
            { _id: addToCartProductId },
            { $set: { quantity } }
        );

        // Check if the update was successful
        if (updateResult.matchedCount === 0) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false,
            });
        }

        res.status(200).json({
            message: "Product updated successfully",
            data: updateResult,
            error: false,
            success: true,
        });
    } catch (err) {
        // console.error("Error updating cart product:", err); // Log error for debugging
        res.status(500).json({
            message: err.message || "An internal server error occurred",
            error: true,
            success: false,
        });
    }
};

module.exports = updateAddToCartProduct;
