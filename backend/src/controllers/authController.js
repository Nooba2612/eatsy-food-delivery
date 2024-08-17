const { createVerification } = require("@config/otp-sms");
const { saveOTP, generateOTP, checkOTP, deleteOTP } = require("@services/otp");
const { comparePassword, hashPassword } = require("@services/password");
const { getUser, createUser } = require("@services/user");
const { generateJWT } = require("@services/jwt");

class authController {
    async sendOTP(req, res) {
        try {
            const { phone, country, resendOTP } = req.body;

            if (!phone || !country) {
                res.status(400).json({ success: false, message: "Failed to send OTP" });
            }

            const phoneNumber = country.countryCode + phone;

            if (resendOTP) {
                await deleteOTP(phoneNumber);
            }

            const otp = generateOTP();

            console.log("\n\nSent OTP: ", otp);

            saveOTP(phoneNumber, otp);
            // createVerification(phoneNumber, otp);

            res.status(200).json({ success: true });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    async verifyOTP(req, res) {
        try {
            const { otp, phone, country } = req.body;

            if (!otp || !phone || !country) {
                return res.status(400).json({ success: false, message: "Missing required fields" });
            }

            const phoneNumber = country.countryCode + phone;
            const user = await getUser(phoneNumber);

            const isValidOTP = await checkOTP(phoneNumber, otp);

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
            const { phone, country, password } = req.body;
            if (!phone || !country || !password) {
                return res.status(400).json({ success: false, message: "Missing required fields" });
            }

            const phoneNumber = country.countryCode + phone;
            const user = await getUser(phoneNumber);

            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            const isValidPassword = await comparePassword(password, user.password);

            if (!isValidPassword) {
                return res.json({ success: false, message: "Login user failed" });
            }

            const token = generateJWT(user);
            console.log("🚀  JWT:", token);

            res.cookie("token", token); // send token to the client

            return res.status(200).json({ success: true, message: "User login successfully", redirect: "/" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    async registerUser(req, res) {
        try {
            const { phone, country, password } = req.body;

            if (!phone || !country || !password) {
                return res.status(400).json({ success: false, message: "Missing required fields" });
            }

            const phoneNumber = country.countryCode + phone;
            const hashedPassword = await hashPassword(password);

            if (await createUser(phoneNumber, hashedPassword)) {
                return res.status(200).json({ success: true, message: "User registered successfully", redirect: "/" });
            } else {
                return res.status(400).json({ success: false, message: "Register user failed" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    async authenticateUser(req, res) {
        try {
            console.log(req.session.user);
            if (req.session.user) {
                res.status(200).json(req.session.user);
            } else {
                res.status(401).send("Not authenticated");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async authenticateToken(req, res) {
        
    }
}

module.exports = new authController();
