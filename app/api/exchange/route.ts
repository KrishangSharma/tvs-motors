import VehicleExchangeConfirmationEmail from "@/react-email-starter/emails/vehicle-exchange";
import { resend } from "@/react-email-starter/lib/resend";
import { NextRequest, NextResponse } from "next/server";

// Generate a unique exchange reference number
function generateExchangeReference(): string {
  const randomNum = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
  return `EXC-${randomNum}`;
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
      fullName,
      email,
      phone,
      currentVehicleModel,
      currentVehicleYear,
      currentVehicleRegistration,
      desiredVehicleDetails,
      additionalComments,
    } = await req.json();

    // Generate a unique reference number for this exchange request
    const exchangeReference = generateExchangeReference();

    // Send confirmation email
    const emailData = {
      from: `exchange@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
      to: email,
      subject: `Confirmation: Vehicle Exchange Request for ${currentVehicleModel}`,
      react: VehicleExchangeConfirmationEmail({
        fullName,
        email,
        phone,
        currentVehicleModel,
        currentVehicleYear,
        currentVehicleRegistration,
        desiredVehicleDetails,
        additionalComments,
        exchangeReference,
      }),
    };

    const emailResponse = await resend.emails.send(emailData);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Vehicle exchange request submitted successfully",
        exchangeReference,
        emailSent: !!emailResponse?.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing vehicle exchange request:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process vehicle exchange request",
      },
      { status: 500 }
    );
  }
}
