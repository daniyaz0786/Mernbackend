const express = require("express");

const router = express.Router();

const userSignUpController = require("../controller/userSignUp");
const userSignInController = require("../controller/userSignIn");
const authToken = require("../middleware/authToken");
const userDetailsController = require("../controller/userDetails");
const userLogout = require("../controller/userLogout");
const allUsers = require("../controller/allUsers");
const updateUser = require("../controller/updateUser");
const uploadProductController = require("../controller/uploadProduct");
const getProductController = require("../controller/getProduct");
const updateProductController = require("../controller/updateProduct");
const getCategoryProduct = require('../controller/product/getCategoryProductOne');
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");
const getProductDetails = require("../controller/product/getProductDetails");
const addToCartController = require("../controller/addToCartController");
const countAddToCartProduct = require("../controller/countAddToCartProduct");
const addToCardViewController = require("../controller/addToCartViewProduct");
const updateAddToCartProduct = require("../controller/updateAddToCartProduct");
const deleteAddToCartProduct = require("../controller/deleteAddToCartProduct");
const searchProduct = require("../controller/product/SearchProduct");
const filterProductController = require("../controller/product/filterProduct");





router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

//admin Panel

router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);


//product Upload

router.post("/upload-product", authToken, uploadProductController)
router.get("/get-product", getProductController)
router.post("/update-product", authToken, updateProductController)
router.get("/get-categoryProduct", getCategoryProduct)
router.post("/category-product", getCategoryWiseProduct)
router.post("/get-productdetails", getProductDetails)
router.get("/search", searchProduct)
router.post("/filterproduct", filterProductController)

//User Add To Cart
router.post("/addtocart", authToken, addToCartController)
router.get("/countAddToCartProduct", authToken, countAddToCartProduct)
router.get("/view-cart-product", authToken, addToCardViewController)
router.post("/update-cart-product", authToken, updateAddToCartProduct)
router.post("/delete-cart-product", authToken, deleteAddToCartProduct)

module.exports = router;

