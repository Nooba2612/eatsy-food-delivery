const { DataTypes } = require("sequelize");

const { sequelize } = require("@config/sequelize");

const deliveryAssignmentModel = sequelize.define(
    "DeliveryAssignment",
    {
        assignment_id: {
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
        delivery_person_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            references: {
                model: "DeliveryPersonnel",
                key: "delivery_person_id",
            },
        },
        assignment_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        status: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                isIn: [["Assigned", "In Transit", "Delivered", "Failed"]],
            },
        },
    },
    {
        tableName: "DeliveryAssignments",
        timestamps: true,
        underscored: true,
    },
);

module.exports = deliveryAssignmentModel;
