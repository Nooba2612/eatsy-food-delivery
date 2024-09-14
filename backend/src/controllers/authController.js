const { v4: uuidv4 } = require("uuid");

const { createVerification } = require("@config/twilio");
const { saveOTP, generateOTP, checkOTP, deleteOTP } = require("@helpers/otpHelper");
const { getUserByPhone, createUser, compareData, hashData, getUserById } = require("@helpers/userHelper");
const { generateJWT } = require("@helpers/jwtHelper");

class authController {
    async sendOTP(req, res) {
        try {
            const { phone, country, resendOTP } = req.body;
            const { countryCode } = country;

            if (!phone || !country) {
                res.status(400).json({ success: false, message: "Failed to send OTP" });
            }

            if (resendOTP) {
                await deleteOTP(countryCode, phone);
            }

            const otp = generateOTP();

            console.log("\n\nSent OTP: ", otp);

            saveOTP(countryCode, phone, otp);
            // createVerification(countryCode + phone, otp);

            res.status(200).json({ success: true });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    async verifyOTP(req, res) {
        try {
            const { otp, phone, country } = req.body;
            const { countryCode } = country;

            if (!otp || !phone || !country) {
                return res.status(400).json({ success: false, message: "Missing required fields" });
            }

            const user = await getUserByPhone(countryCode, phone);

            const isValidOTP = await checkOTP(countryCode, phone, otp);
            console.log("🚀  isValidOTP:", isValidOTP);

            if (isValidOTP) {
                return res
                    .status(200)
                    .json({ success: true, message: "OTP verified successfully", existUser: user ? true : false });
            } else {
                return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    async loginUser(req, res) {
        try {
            const { phone, country, password, memorizedLogin } = req.body;
            const { countryCode } = country;

            if (!phone || !country || !password) {
                return res.status(400).json({ success: false, message: "Missing required fields" });
            }

            const user = await getUserByPhone(countryCode, phone); // get user from DB
            console.log("🐸  user:", user);

            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            const isValidPassword = await compareData(password, user.password);

            if (!isValidPassword) {
                return res.json({ success: false, message: "Login user failed" });
            }

            const jwtExpiresIn =
                memorizedLogin === "true" ? process.env.JWT_EXPIRES_IN_30D : process.env.JWT_EXPIRES_IN_1H;
            const cookieMaxAge =
                memorizedLogin === "true" ? process.env.COOKIE_MAX_AGE_30D : process.env.COOKIE_MAX_AGE_1H;
            const token = generateJWT(user, jwtExpiresIn); // create token
            res.cookie("token", token, { maxAge: parseInt(cookieMaxAge) }); // send token to the client

            return res.status(200).json({ success: true, message: "User login successfully", redirect: "/" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    async registerUser(req, res) {
        try {
            const { username, phone, country, password, memorizedLogin } = req.body;
            const { countryCode } = country;

            if (!username || !phone || !country || !password) {
                return res.status(400).json({ success: false, message: "Missing required fields" });
            }

            const hashedPassword = await hashData(password);

            await createUser(username, countryCode, phone, hashedPassword); // add user to DB

            const user = await getUserByPhone(countryCode, phone); // get user from DB

            if (!user) {
                return res.status(400).json({ success: false, message: "Register user failed" });
            }

            const jwtExpiresIn =
                memorizedLogin === "true" ? process.env.JWT_EXPIRES_IN_30D : process.env.JWT_EXPIRES_IN_1H;
            const cookieMaxAge =
                memorizedLogin === "true" ? process.env.COOKIE_MAX_AGE_30D : process.env.COOKIE_MAX_AGE_1H;
            const token = generateJWT(user, jwtExpiresIn); // create token
            res.cookie("token", token, { maxAge: parseInt(cookieMaxAge) }); // send token to the client
            return res.status(200).json({ success: true, message: "User registered successfully", redirect: "/" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    async logoutUser(req, res) {
        try {
            const token = req.cookies.token;

            if (!token) {
                return res.status(400).json({ success: false, message: "No token provided" });
            }

            res.clearCookie("token");
            return res.status(200).json({ success: true, message: "Logged out successfully" });
        } catch (error) {
            console.log(error);
        }
    }

    async loginStatus(req, res) {
        try {
            const userId = req.user.id;
            const user = await getUserById(userId);
            const { memorizedLogin } = req.cookies;

            if (!user) {
                return res.status(401).json({ success: false, message: "Unauthorized" });
            }

            const jwtExpiresIn =
                memorizedLogin === "true" ? process.env.JWT_EXPIRES_IN_30D : process.env.JWT_EXPIRES_IN_1H;
            const cookieMaxAge =
                memorizedLogin === "true" ? process.env.COOKIE_MAX_AGE_30D : process.env.COOKIE_MAX_AGE_1H;
            const token = generateJWT(user, jwtExpiresIn); // create token
            res.cookie("token", token, { maxAge: parseInt(cookieMaxAge) }); // send token to the client
            res.clearCookie("memorizedLogin");
            return res.json({ success: true, message: "Login successful!" });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new authController();
