const { DataTypes } = require("sequelize");

const { sequelize } = require("@config/sequelize");

const orderItemModel = sequelize.define(
    "OrderItem",
    {
        order_item_id: {
            type: DataTypes.STRING(255),
            primaryKey: true,
        },
        order_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            references: {
                model: "Orders",
                key: "order_id",
            },
        },
        dish_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            references: {
                model: "Dishes",
                key: "dish_id",
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "OrderItems",
        timestamps: true,
        underscored: true,
    },
);

module.exports = orderItemModel;
