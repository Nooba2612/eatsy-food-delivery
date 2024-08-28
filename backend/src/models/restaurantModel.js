const { DataTypes } = require("sequelize");

const { sequelize } = require("@config/sequelize");

const restaurantModel = sequelize.define(
    "Restaurant",
    {
        restaurant_id: {
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
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        rating: {
            type: DataTypes.DECIMAL(2, 1),
            allowNull: true,
        },
        food_type: {
            type: DataTypes.STRING(225),
            allowNull: true,
        },
        profit: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        open_time: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        close_time: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        is_open: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "Restaurants",
        timestamps: true,
        underscored: true,
    },
);

module.exports = restaurantModel;
