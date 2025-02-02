const mongoose = require("mongoose");

const addTocartSchema = new mongoose.Schema(
    {
        productId: {
            ref: `product`,
            type: String,
        },
        quantity: Number,
        userId: String,
    },
    {
        timestamps: true,
    }
);

const addTocarttModel = mongoose.model("adtocart", addTocartSchema);

module.exports = addTocarttModel;
