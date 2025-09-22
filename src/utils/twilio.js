import twilio from "twilio";
import "dotenv/config.js";
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendSms = async (to, code) => {
  try {
    await client.messages.create({
      body: `Your verification code is ${code}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
    console.log("SMS sent successfully");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export default sendSms;
