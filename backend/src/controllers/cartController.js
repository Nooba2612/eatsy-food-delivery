const { updateCartItemQuantity, deleteCartItem } = require("@services/cartService");

class cartController {
    async updateQuantity(req, res) {
        const { cartItemId, quantity } = req.body;


        if (!cartItemId) {
            return res.status(400).json({ success: false, message: "Missing cart item ID field" });
        }

        if (quantity === null) {
            return res.status(400).json({ success: false, message: "Missing quantity field" });
        }

        await updateCartItemQuantity(cartItemId, quantity);
        res.status(200).json({ success: true, message: "Update cart item quantity successfully" });
    }

    async deleteCartItem(req, res) {
        const cartItemId = req.params.id;

        if (!cartItemId) {
            return res.status(400).json({ success: false, message: "Missing cart item id field" });
        }

        await deleteCartItem(cartItemId);
        res.status(200).json({ success: true, message: "Cart item deleted" });
    }
}

module.exports = new cartController();
