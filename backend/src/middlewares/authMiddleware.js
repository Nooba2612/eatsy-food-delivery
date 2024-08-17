const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    const token = req.session.token;

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    jwt.verify(token, jwtSecretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, message: "Invalid or expired token" });
        }

        // Check admin role
        // if (decoded.role !== "admin") {
        //     return res.status(403).json({ success: false, message: "Access denied: Admins only" });
        // }

        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;
