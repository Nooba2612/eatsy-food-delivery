const twilio = require("twilio");
const dotenv = require("dotenv");

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGE_SERVICE_SID;

const client = twilio(accountSid, authToken);
const createVerification = async (phoneNumber, otp) => {
    client.messages
        .create({
            body: `Your Eatsy verification code is: ${otp}. This code will expire in 10 minutes.`,
            messagingServiceSid: messagingServiceSid,
            to: phoneNumber,
        })
        .then((message) => console.log(message.sid));
};

module.exports = createVerification;
