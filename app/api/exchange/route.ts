import VehicleExchangeConfirmationEmail from "@/react-email-starter/emails/vehicle-exchange";
import AdminExchangeEmail from "@/react-email-starter/emails/admin-exchange";
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
    const requestDate = new Date();

    // Admin email data
    const adminEmailData = {
      from: `exchange@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
      to: process.env.ADMIN_EMAIL!,
      subject: `New Vehicle Exchange Request: ${exchangeReference}`,
      react: AdminExchangeEmail({
        fullName,
        email,
        phone,
        currentVehicleModel,
        currentVehicleYear,
        currentVehicleRegistration,
        desiredVehicleDetails,
        additionalComments,
        exchangeReference,
        requestDate,
      }),
    };

    // Send emails based on whether user provided an email
    if (email && email.trim() !== "") {
      const customerEmailData = {
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

      // Send both emails
      await Promise.all([
        resend.emails.send(customerEmailData),
        resend.emails.send(adminEmailData),
      ]);
    } else {
      // Send only admin email
      await resend.emails.send(adminEmailData);
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Vehicle exchange request submitted successfully",
        exchangeReference,
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
