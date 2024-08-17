const { connection } = require("@config/database");

const generateOTP = (length = 6) => {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }

    return otp;
};

const saveOTP = async (phoneNumber, otp) => {
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires after 10 minutes

    const sql = `
        INSERT INTO OTP (phone_number, otp, expires_at)
        VALUES (${connection.escape(phoneNumber)}, ${connection.escape(otp)}, ${connection.escape(expiresAt)})
    `;

    try {
        await connection.execute(sql, [phoneNumber, otp, expiresAt]);
    } catch (error) {
        console.error("Error saving OTP:", error);
    }
};

const checkOTP = async (phoneNumber, otp) => {
    try {
        const sql = `
            SELECT otp, expires_at
            FROM OTP
            WHERE phone_number = ?
            ORDER BY expires_at DESC
            LIMIT 1
        `;

        return new Promise((resolve, reject) => {
            connection.execute(sql, [phoneNumber], (err, rows) => {
                if (err) {
                    console.log("\n\nDatabase error: ", err);
                    reject(err);
                    return;
                }

                console.log("\n\nDatabase results: ", rows);

                if (rows.length === 0) {
                    resolve(false); // No OTP found
                    return;
                }

                const { otp: storedOTP, expires_at } = rows[0];
                const now = new Date();

                // Check expiration
                if (now > new Date(expires_at)) {
                    console.log("OTP expired");
                    resolve(false); // OTP expired
                    return;
                }

                // Check OTP
                if (storedOTP !== otp) {
                    console.log("Invalid OTP");
                    console.log("storedOTP: " + storedOTP + " otp: " + otp);
                    resolve(false); // Invalid OTP
                    return;
                }

                resolve(true); // OTP is valid
            });
        });
    } catch (error) {
        console.log(error);
        throw error; // Optionally rethrow the error to handle it elsewhere
    }
};

const deleteOTP = async (phoneNumber) => {
    const sql = `DELETE FROM OTP WHERE phone_number = '${phoneNumber}'`;

    try {
        connection.execute(sql, [phoneNumber], (err, rows) => {
            if (err) {
                console.log("Error deleting OTP:", err);
            }

            console.log("OTP deleted for phone number:", phoneNumber);
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    generateOTP,
    saveOTP,
    checkOTP,
    deleteOTP,
};
