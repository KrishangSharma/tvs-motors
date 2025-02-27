import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

// Twilio Credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;
const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID as string;

// Initialize Twilio Client
const twilioClient = twilio(accountSid, authToken);

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body
    const body = await req.json();
    const { phone, otp } = body;

    // Validate input
    if (!phone || !otp || !/^\d{10}$/.test(phone) || !/^\d{4,6}$/.test(otp)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Verify the OTP using Twilio
    const verificationCheck = await twilioClient.verify.v2
      .services(serviceSid)
      .verificationChecks.create({
        to: `+91${phone}`,
        code: otp,
      });

    if (verificationCheck.status === "approved") {
      return NextResponse.json(
        { message: "OTP verified successfully" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: "Invalid or expired OTP" },
      { status: 400 }
    );
  } catch (error) {
    console.error("❌ OTP Verification Error:", error);
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
