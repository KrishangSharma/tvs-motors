import { AMCConfirmationEmail } from "@/react-email-starter/emails/get-amc";
import { resend } from "@/react-email-starter/lib/resend";
import { NextRequest, NextResponse } from "next/server";

// Generate a unique order reference number
function generateOrderReference(): string {
  const randomNum = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
  return `AMC-${randomNum}`;
}
const orderReference = generateOrderReference();

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const {
      ownerName,
      email,
      phone,
      vehicleMake,
      vehicleModel,
      registrationNumber,
      amcPackage,
      startDate,
      additionalComments,
    } = await req.json();

    // Send confirmation email
    const emailData = {
      from: "testride@resend.dev",
      to: email,
      subject: `Confirmation: AMC Booking for ${vehicleMake} ${vehicleModel}`,
      react: AMCConfirmationEmail({
        ownerName,
        email,
        phone,
        vehicleMake,
        vehicleModel,
        registrationNumber,
        amcPackage,
        startDate,
        orderReference,
        additionalComments,
      }),
    };

    const emailResponse = await resend.emails.send(emailData);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Test ride booked successfully",
        emailSent: !!emailResponse?.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error booking test ride:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to book test ride",
      },
      { status: 500 }
    );
  }
}
