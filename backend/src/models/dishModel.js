const { DataTypes } = require("sequelize");

const { sequelize } = require("@config/sequelize");

const dishModel = sequelize.define(
    "Dishes",
    {
        dish_id: {
            type: DataTypes.STRING(255),
            primaryKey: true,
        },
        restaurant_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            references: {
                model: "Restaurants",
                key: "restaurant_id",
            },
        },
        thumbnail: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        available: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        tableName: "Dishes",
        timestamps: true,
        underscored: true,
    },
);

module.exports = dishModel;
