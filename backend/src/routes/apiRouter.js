const express = require("express");
const router = express.Router();

const apiController = require("@controllers/apiController");

// * Dishes
router.get("/dishes", apiController.getCartItems);

// * Cart
router.get("/cart", apiController.getCartItems);

module.exports = router;
