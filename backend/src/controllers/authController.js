const { v4: uuidv4 } = require("uuid");

const { createVerification } = require("@config/twilio");
const { saveOTP, generateOTP, checkOTP, deleteOTP } = require("@services/otpService");
const { compareHashedData, awaithashData, hashData } = require("@helpers/validationHelper");
const {
    getUserByPhoneNumber,
    createUser,
    getUserById,
    getUserByEmail,
    changePassword,
} = require("@services/userService");
const { generateJWT } = require("@helpers/jwtHelper");
const { regexVietnamPhoneNumber, regexEmail } = require("@constants/constants");
const { sendEmail } = require("@config/nodemailer");

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

            const user = await getUserByPhoneNumber(countryCode, phone);

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

            const user = await getUserByPhoneNumber(countryCode, phone); // get user from DB
            console.log("🐸  user:", user);

            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            const isValidPassword = await compareHashedData(password, user.password);

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

            const hashedPassword = await awaithashData(password);
            const typeLogin = "Standard";

            await createUser(username, typeLogin, countryCode, phone, hashedPassword); // add user to DB

            const user = await getUserByPhoneNumber(countryCode, phone); // get user from DB

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

    async forgotPasswordSendOTP(req, res) {
        const { info, countryCode, resendOTP } = req.body;
        const otp = generateOTP();

        if (!info) {
            console.log("\n\nInfo is null\n\n");
            return res.status(404).json({ success: false, message: "Info is null" });
        }

        if (resendOTP) {
            await deleteOTP(countryCode, info);
        }

        if (info && regexVietnamPhoneNumber.test(info)) {
            try {
                console.log("\n\nSent OTP: ", otp);

                saveOTP(countryCode, info, otp);
                // createVerification(countryCode + phone, otp);

                return res.status(200).json({ success: true });
            } catch (error) {
                console.log("Send otp to phone number failed: " + error);
            }
        }

        if (info && regexEmail.test(info)) {
            try {
                sendEmail(
                    info,
                    "Xác nhận thiết lập lại mật khẩu Eatsy",
                    "Vui lòng không cung cấp mã OTP cho bất kỳ ai. Mã OTP của bạn là: " + otp,
                );

                console.log("\n\nSent OTP: ", otp);

                saveOTP(null, info, otp);

                return res.status(200).json({ success: true });
            } catch (error) {
                console.log("Send otp to email failed: " + error);
            }
        }

        res.status(404).json({ success: false });
    }

    async forgotPasswordVerifyOTP(req, res) {
        try {
            const { otp, info } = req.body;
            console.log(otp);
            console.log(info);

            if (!otp || !info) {
                return res.status(400).json({ success: false, message: "Missing required fields" });
            }

            const isValidOTP = await checkOTP("+84", info, otp);

            console.log("🚀  isValidOTP:", isValidOTP);

            if (isValidOTP) {
                return res.status(200).json({ success: true, message: "OTP verified successfully" });
            } else {
                return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    async resetPassword(req, res) {
        const { newPassword, info } = req.body;
        let user;

        if (!newPassword || !info) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        if (regexEmail.test(info)) {
            user = await getUserByEmail(info);
        }

        if (regexVietnamPhoneNumber.test(info)) {
            user = await getUserByPhoneNumber("+84", info);
        }

        if (!user) {
            return res.status(400).json({ success: false, message: "Not found user" });
        }

        const { user_id } = user;
        const newPasswordHashed = await hashData(newPassword);

        await changePassword(user_id, newPasswordHashed);

        res.status(200).json({ success: true, message: "Change password successfully" });
    }
}

module.exports = new authController();
