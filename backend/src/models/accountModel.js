const { DataTypes } = require("sequelize");
const { sequelize } = require("@config/sequelize");

const accountModel = sequelize.define(
    "Account",
    {
        account_id: {
            type: DataTypes.STRING(225),
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.STRING(255),
            allowNull: true,
            references: {
                model: "Users",
                key: "user_id",
            },
            onDelete: "CASCADE",
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        type_login: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: true,
        },
        phone_number: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        country_code: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("admin", "customer", "owner", "employee"),
            defaultValue: "customer",
        },
        avatar_path: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        payment_method: {
            type: DataTypes.ENUM("Credit Card", "Momo", "Zalo Pay", "Bank Transfer", "Cash"),
            defaultValue: "Cash",
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW,
        },
        last_login: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        is_online: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        tableName: "Accounts",
        timestamps: false,
        underscored: false,
    },
);

module.exports = accountModel;
