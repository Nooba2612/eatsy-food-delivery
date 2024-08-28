const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const { userModel } = require("@models/index");

const hashData = async (plainData) => {
    const saltRounds = 10;

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedData = await bcrypt.hash(plainData, salt);
        return hashedData;
    } catch (error) {
        console.error("Error hashing data:", error);
        throw new Error("Hashing failed");
    }
};

const compareData = async (password, storedData) => {
    return await bcrypt.compareSync(password, storedData);
};

const generateUserId = () => {
    const id = uuidv4();
    return id;
};

const getUserByPhone = async (countryCode, phoneNumber) => {
    try {
        const user = await userModel.findOne({ where: { country_code: countryCode, phone: phoneNumber } });
        if (user) {
            console.log("User found:", user?.dataValues);
            return user;
        } else {
            console.log("No user found with that phone number");
            return;
        }
    } catch (error) {
        console.log(error);
    }
};

const getUserById = async (userId) => {
    try {
        const user = await userModel.findOne({ where: { user_id: userId } });
        if (user) {
            console.log("User found:", user?.dataValues);
            return user?.dataValues;
        } else {
            console.log("No user found with that phone number");
            return;
        }
    } catch (error) {
        console.log(error);
    }
};

const createUser = async (name, country_code, phone, password) => {
    try {
        const userId = generateUserId();

        const newUser = await userModel.create({
            user_id: userId,
            name,
            country_code,
            phone,
            password,
            type_login: "local",
        });
        console.log("User created:", newUser);
        return newUser;
    } catch (error) {
        console.log(error);
    }
};

const updateUser = async () => {};

const deleteUser = async () => {};

module.exports = {
    getUserByPhone,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    hashData,
    compareData,
    generateUserId,
};
