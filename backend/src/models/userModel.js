const { DataTypes } = require("sequelize");
const { sequelize } = require("@config/sequelize");

const userModel = sequelize.define(
    "User",
    {
        user_id: {
            type: DataTypes.STRING(255),
            primaryKey: true,
        },
        fullname: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        gender: {
            type: DataTypes.ENUM("Male", "Female", "Other"),
            allowNull: true,
        },
        date_of_birth: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
    },
    {
        tableName: "Users",
        timestamps: false,
        underscored: false,
    },
);

module.exports = userModel;
