import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

// Twilio Credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;
const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID as string;

// Initialize Twilio Client
const twilioClient = twilio(accountSid, authToken);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { phone, otp } = req.body;

  // Validate input
  if (!phone || !otp || !/^\d{10}$/.test(phone) || !/^\d{4,6}$/.test(otp)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    // Verify the OTP using Twilio
    const verificationCheck = await twilioClient.verify.v2
      .services(serviceSid)
      .verificationChecks.create({
        to: `+91${phone}`,
        code: otp,
      });

    if (verificationCheck.status === "approved") {
      return res.status(200).json({ message: "OTP verified successfully" });
    } else {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }
  } catch (error) {
    console.error("❌ OTP Verification Error:", error);
    return res.status(500).json({ error: "Failed to verify OTP" });
  }
}
