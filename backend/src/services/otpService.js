const { v4: uuidv4 } = require("uuid");

const { otpModel } = require("@models/index");

const generateOTP = (length = 6) => {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }

    return otp;
};

const saveOTP = async (countryCode, phoneNumber, otp) => {
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 10);
    const otpId = uuidv4();
    try {
        await otpModel.create({
            otp_id: otpId,
            country_code: countryCode,
            phone_number: phoneNumber,
            otp: otp,
            expires_at: expirationTime,
        });
    } catch (error) {
        console.error("Error saving OTP:", error);
    }
};

const checkOTP = async (countryCode, phoneNumber, otp) => {
    try {
        const otpEntry = await otpModel.findOne({
            where: { country_code: countryCode, phone_number: phoneNumber },
            order: [["expires_at", "DESC"]],
        });

        if (!otpEntry) {
            console.log("No OTP found");
            return false; // No OTP found
        }

        const { otp: storedOTP, expires_at } = otpEntry;
        const now = new Date();

        // Check expiration
        if (now > new Date(expires_at)) {
            console.log("OTP expired");
            return false; // OTP expired
        }

        // Check OTP
        if (storedOTP !== otp) {
            console.log("Invalid OTP");
            console.log("storedOTP: " + storedOTP + " otp: " + otp);
            return false; // Invalid OTP
        }

        return true; // OTP is valid
    } catch (error) {
        console.error("Error checking OTP:", error);
        throw error; // Optionally rethrow the error to handle it elsewhere
    }
};

const deleteOTP = async (countryCode, phoneNumber) => {
    try {
        const result = await otpModel.destroy({
            where: { country_code: countryCode, phone: phoneNumber },
        });

        if (result > 0) {
            console.log("OTP deleted for phone number:", phoneNumber);
        } else {
            console.log("No OTP found for phone number:", phoneNumber);
        }
    } catch (error) {
        console.error("Error deleting OTP:", error);
    }
};

module.exports = {
    generateOTP,
    saveOTP,
    checkOTP,
    deleteOTP,
};
