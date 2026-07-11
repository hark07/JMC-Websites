import client from "../config/sms.js";

export const sendSMSOTP = async (phone, otp) => {
  await client.messages.create({
    body: `Your Admin OTP is ${otp}`,

    from: process.env.TWILIO_PHONE,

    to: phone,
  });
};
