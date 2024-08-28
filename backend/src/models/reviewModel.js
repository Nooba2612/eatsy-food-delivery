const { DataTypes } = require("sequelize");

const { sequelize } = require("@config/sequelize");

const reviewModel = sequelize.define(
    "Review",
    {
        review_id: {
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
        rating: {
            type: DataTypes.DECIMAL(2, 1),
            allowNull: false,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        review_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "Reviews",
        timestamps: true,
        underscored: true,
    },
);

module.exports = reviewModel;
