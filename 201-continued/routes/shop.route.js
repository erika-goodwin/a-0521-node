const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop.controller");


router.get("/", shopController.getProducts);

router.get('/products:productId', shopController.getProductById)

// router.get("/add-product", shopController.getAddProduct);

// router.post("/add-product", shopController.postAddProduct);

// router.get("/edit-product/:productId", shopController.getEditProduct);

// router.post("/edit-product", shopController.postEditProduct);

// router.post("/delete-product", shopController.postDeleteProduct);

module.exports = router;
