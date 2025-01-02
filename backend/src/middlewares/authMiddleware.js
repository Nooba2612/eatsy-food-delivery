const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    // const token = req.cookies.token;
    const token = req.header("Authorization") && req.header("Authorization").split(" ")[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    jwt.verify(token, jwtSecretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, message: "Invalid or expired token" });
        }

        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;
