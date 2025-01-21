const { getAllDish, getDishesByName } = require("@services/dishService");
const dishModel = require("@models/dishModel");
const { where, Op } = require("sequelize");
const categoryModel = require("@models/categoryModel");
const { authMiddleware } = require("@middlewares/authMiddleware");
const { getCartItemsByUserId } = require("@services/cartService");
const { getUserInfo } = require("@helpers/jwtHelper");
const { jwtDecode } = require("jwt-decode");

class apiController {
    async getDishes(req, res) {
        const searchCondition = {};
        const { name, sort, category } = req.query;

        if (name) {
            searchCondition.name = { [Op.like]: `%${name}%` };
        }

        if (category) {
            const categoryRecord = await categoryModel.findOne({
                where: { name: category },
            });
            if (!categoryRecord) {
                return res.status(404).json({ message: "Category not found" });
            }
            searchCondition.category_id = categoryRecord.category_id;
        }

        try {
            const dishes = await dishModel.findAll({ where: searchCondition, order: [["price", sort || "ASC"]] });
            if (!dishes || dishes.length === 0) {
                return res.status(404).json({ message: "No dishes found" });
            }
            res.status(200).json(dishes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async getCartItems(req, res) {
        const { token } = req.cookies;
        const { user_id } = jwtDecode(token);

        const cartItems = await getCartItemsByUserId(user_id);

        console.log("🐸  cartItems:", cartItems);

        res.json(cartItems);
    }
}

module.exports = new apiController();
