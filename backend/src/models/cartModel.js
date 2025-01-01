const { DataTypes } = require("sequelize");
const { sequelize } = require("@config/sequelize");

const cartModel = sequelize.define(
    "Cart",
    {
        cart_id: {
            type: DataTypes.STRING(255),
            primaryKey: true,
        },
        account_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            references: {
                model: "Accounts",
                key: "account_id",
            },
        },
    },
    {
        tableName: "Carts",
        timestamps: false,
        underscored: false,
    },
);

module.exports = cartModel;
