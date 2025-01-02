const jwt = require("jsonwebtoken");
const generateJWT = (user, expiresIn) => {
    const { user_id, username, fullname, email, country_code, phone_number, address, avatar_path, date_of_birth } =
        user;

    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    const token = jwt.sign(
        { user_id, username, fullname, email, country_code, phone_number, address, avatar_path, date_of_birth },
        jwtSecretKey,
        {
            expiresIn,
        },
    );

    return token;
};

module.exports = {
    generateJWT,
};
