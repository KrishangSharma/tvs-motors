import twilio from "twilio";

// Twilio Credentials (store in .env)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export const sendOTP = async (phone: number, otp: number) => {
  try {
    const message = await client.messages.create({
      body: `Your OTP is: ${otp}. It will expire in 30 seconds.`,
      from: twilioPhoneNumber,
      to: `+91${phone}`, // Change country code if needed
    });

    console.log("OTP sent successfully:", message.sid);
    return true;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return false;
  }
};
