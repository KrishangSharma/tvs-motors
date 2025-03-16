import { InsuranceRenewalEmail } from "@/react-email-starter/emails/insurance-renewal";
import { resend } from "@/react-email-starter/lib/resend";
import { NextRequest, NextResponse } from "next/server";

// Generate a unique request ID
function generateRequestId(): string {
  const randomNum = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
  return `INS-${randomNum}`;
}

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const {
      customerName,
      contactNumber,
      emailId,
      model,
      registrationNumber,
      registrationYear,
      previousInsuranceCompany,
    } = await req.json();

    // Validate required fields
    if (!customerName || !emailId || !registrationNumber) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const requestId = generateRequestId();
    const requestDate = new Date();

    // Send confirmation email
    const emailData = {
      from: "insurance@resend.dev",
      to: emailId,
      subject: "Insurance Renewal Request Confirmation",
      react: InsuranceRenewalEmail({
        customerName,
        contactNumber,
        emailId,
        model,
        registrationNumber,
        registrationYear,
        previousInsuranceCompany,
        requestId,
        requestDate,
      }),
    };

    const emailResponse = await resend.emails.send(emailData);
    return NextResponse.json(
      {
        success: true,
        message: "Insurance renewal request submitted successfully",
        requestId,
        emailSent: !!emailResponse?.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting insurance renewal request:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit insurance renewal request",
      },
      { status: 500 }
    );
  }
}
