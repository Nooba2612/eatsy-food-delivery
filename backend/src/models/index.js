const { sequelize } = require("@config/sequelize");

const userModel = require("@models/userModel");
const conversationModal = require("@models/conversationModel");
const dishModel = require("@models/dishModel");
const deliveryPersonelModal = require("@models/deliveryPersonnelModel");
const orderItemModal = require("@models/orderItemModel");
const deliveryAssignmentModel = require("@models/deliveryAssignmentModel");
const orderModel = require("@models/orderModel");
const otpModel = require("@models/otpModel");
const restaurantModel = require("@models/restaurantModel");
const reviewModel = require("@models/reviewModel");

sequelize
    .sync()
    .then(() => {
        console.log("\n\nTables have been created\n\n");
    })
    .catch((error) => console.log("\n\nThis error occurred", error + "\n\n"));

module.exports = {
    userModel,
    conversationModal,
    deliveryPersonelModal,
    orderItemModal,
    deliveryAssignmentModel,
    orderModel,
    otpModel,
    restaurantModel,
    reviewModel,
    dishModel,
};
