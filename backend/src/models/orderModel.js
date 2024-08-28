const { DataTypes } = require("sequelize");

const { sequelize } = require("@config/sequelize");

const orderModel = sequelize.define(
    "Order",
    {
        order_id: {
            type: DataTypes.STRING(255),
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            references: {
                model: "Users",
                key: "user_id",
            },
        },
        restaurant_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            references: {
                model: "Restaurants",
                key: "restaurant_id",
            },
        },
        food_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        foods: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        order_note: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        order_status: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                isIn: [["Pending", "In Progress", "Completed", "Cancelled"]],
            },
        },
    },
    {
        tableName: "Orders",
        timestamps: true,
        underscored: true,
    },
);

module.exports = orderModel;
