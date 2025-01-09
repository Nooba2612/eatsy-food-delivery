const { Op } = require("sequelize");
const dishModel = require("@models/dishModel");

const getAllDish = async () => {
    try {
        const dishes = await dishModel.findAll();
        return dishes;
    } catch (error) {
        console.error(error);
    }
};


const findDishesByName = async (name) => {
    try {
        const dishes = await dishModel.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`,
                },
            },
        });
        return dishes;
    } catch (error) {
        console.error("Error finding dishes by name:", error);
        throw error;
    }
};

module.exports = { getAllDish, findDishesByName };
