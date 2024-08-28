const { DataTypes } = require("sequelize");

const { sequelize } = require("@config/sequelize");

const otpModel = sequelize.define(
    "OTP",
    {
        otp_id: {
            type: DataTypes.STRING(255),
            primaryKey: true,
        },
        phone: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        otp: {
            type: DataTypes.STRING(6),
            allowNull: false,
        },
        country_code: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        expires_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: "OTP",
        timestamps: true,
        underscored: true,
    },
);

module.exports = otpModel;
