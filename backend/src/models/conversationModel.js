const { DataTypes } = require("sequelize");

const { sequelize } = require("@config/sequelize");

const conversationModel = sequelize.define(
    "Conversation",
    {
        conversation_id: {
            type: DataTypes.STRING(255),
            primaryKey: true,
        },
        sender_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            references: {
                model: "Users",
                key: "user_id",
            },
        },
        receiver_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            references: {
                model: "Users",
                key: "user_id",
            },
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        timestamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "Conversations",
        timestamps: true,
        underscored: true,
    },
);

module.exports = conversationModel;
