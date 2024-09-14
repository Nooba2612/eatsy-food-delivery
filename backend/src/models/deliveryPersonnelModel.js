const { DataTypes } = require("sequelize");

const { sequelize } = require("@config/sequelize");

const deliveryPersonnelModel = sequelize.define(
    "DeliveryPersonnel",
    {
        delivery_person_id: {
            type: DataTypes.STRING(255),
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        vehicle_details: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        tableName: "DeliveryPersonnel",
        timestamps: true,
        underscored: true,
    },
);

module.exports = deliveryPersonnelModel;
