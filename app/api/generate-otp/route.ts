import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

// Twilio Credentials (Stored in .env.local)
const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;
const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID as string;

// Initialize Twilio Client
const twilioClient = twilio(accountSid, authToken);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { phone } = body;

  // Validate phone number
  if (!phone || !/^\d{10}$/.test(phone)) {
    console.log(phone);

    return NextResponse.json({
      error: "Invalid phone number format",
      status: 400,
    });
  }

  try {
    // Request Twilio to send OTP
    const otpRequest = await twilioClient.verify.v2
      .services(serviceSid)
      .verifications.create({
        to: `+91${phone}`,
        channel: "sms",
      });

    return NextResponse.json({
      message: "OTP sent successfully",
      sid: otpRequest.sid,
      status: 200,
    });
  } catch (error) {
    console.error("❌ OTP Sending Error:", error);
    return NextResponse.json({ error: "Failed to send OTP", status: 500 });
  }
}
