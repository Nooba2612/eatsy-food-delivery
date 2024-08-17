const bcrypt = require("bcrypt");
const hashPassword = async (plainPassword) => {
    const saltRounds = 10;

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(plainPassword, salt);
        return hashedPassword;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw new Error("Hashing failed");
    }
};

const comparePassword = async (password, storedPassword) => {
    return await bcrypt.compareSync(password, storedPassword);
};

module.exports = {
    hashPassword,
    comparePassword,
};
