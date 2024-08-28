const jwt = require("jsonwebtoken");
const generateJWT = (user, expiresIn) => {
    const { user_id, name, email, country_code, phone, address, avatar, date_of_birth, is_merchant } = user;

    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    const token = jwt.sign(
        { user_id, name, email, country_code, phone, address, avatar, date_of_birth, is_merchant },
        jwtSecretKey,
        {
            expiresIn: expiresIn,
        },
    );

    return token;
};

module.exports = {
    generateJWT,
};
