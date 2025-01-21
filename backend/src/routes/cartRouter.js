const cartController = require("@controllers/cartController");
const express = require("express");
const router = express.Router();

// PUT
router.put("/update-quantity", cartController.updateQuantity);

// DELETE
router.delete("/delete-item/:id", cartController.deleteCartItem);

module.exports = router;
