const cartModel = require("@models/cartModel");
const cartItemModel = require("@models/cartItemModel");
const { getDishById } = require("./dishService");

const getCartItemsByUserId = async (user_id) => {
    try {
        const cart = await cartModel.findOne({
            where: { user_id: user_id },
        });

        const { cart_id } = cart;

        const cartItems = await cartItemModel.findAll({
            where: { cart_id: cart_id },
        });

        const newCartItems = Promise.all(
            cartItems.map(async (item) => {
                const { dish_id } = item;
                const dish = await getDishById(dish_id, { exclude: ["dish_id", "update_at"] });

                return { ...item.dataValues, ...dish.dataValues };
            }),
        );

        return newCartItems;
    } catch (error) {
        console.log("Error getting cart items", error);
    }
};

module.exports = {
    getCartItemsByUserId,
};
