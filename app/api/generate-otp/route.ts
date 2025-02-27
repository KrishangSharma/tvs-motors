import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

// Twilio Credentials (Stored in .env.local)
const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;
const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID as string;

// Initialize Twilio Client
const twilioClient = twilio(accountSid, authToken);

export async function POST(req: NextRequest, res: NextResponse) {
  const { phone } = await req.json;

  // Validate phone number
  if (!phone || !/^\d{10}$/.test(phone)) {
    return res.status(400).json({ error: "Invalid phone number format" });
  }

  try {
    // Request Twilio to send OTP
    const otpRequest = await twilioClient.verify.v2
      .services(serviceSid)
      .verifications.create({
        to: `+91${phone}`,
        channel: "sms",
      });

    return res
      .status(200)
      .json({ message: "OTP sent successfully", sid: otpRequest.sid });
  } catch (error) {
    console.error("❌ OTP Sending Error:", error);
    return res.status(500).json({ error: "Failed to send OTP" });
  }
}
