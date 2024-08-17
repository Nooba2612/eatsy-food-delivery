const jwt = require("jsonwebtoken");
const generateJWT = (user) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

    const token = jwt.sign({ id: user.id, phone: user.phone }, jwtSecretKey, { expiresIn: jwtExpiresIn });

    return token;
};

module.exports = {
    generateJWT,
};
