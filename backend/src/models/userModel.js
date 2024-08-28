const { DataTypes } = require("sequelize");

const { sequelize } = require("@config/sequelize");

const userModel = sequelize.define(
    "User",
    {
        user_id: {
            type: DataTypes.STRING(255),
            primaryKey: true,
        },
        type_login: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        country_code: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING(20),
            unique: true,
            allowNull: true,
        },
        gender: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        payment_method: {
            type: DataTypes.STRING(20),
            allowNull: true,
            validate: {
                isIn: [["Credit Card", "Momo", "Zalo Pay", "Bank Transfer", "Cash"]],
            },
        },
        avatar: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
        date_of_birth: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        last_login: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        is_online: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        is_merchant: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        tableName: "Users",
        timestamps: true,
        underscored: true,
    },
);

module.exports = userModel;
