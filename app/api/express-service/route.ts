import { ServiceConfirmationEmail } from "@/react-email-starter/emails/service-confirmation";
import { resend } from "@/react-email-starter/lib/resend";
import { NextRequest, NextResponse } from "next/server";

// Generate a unique service reference number
function generateServiceReference(): string {
  const timestamp = new Date().getTime().toString().slice(-6);
  const randomNum = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `SRV-${timestamp}${randomNum}`;
}

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    // Parse the request body
    const formData = await req.json();
    const {
      name,
      contactNumber,
      emailId,
      model,
      registrationNumber,
      serviceType,
      pickupRequired,
      bookingDate,
      bookingTime,
    } = formData;

    // Generate a unique reference number for this service booking
    const referenceNumber = generateServiceReference();

    // Send confirmation email
    const emailData = {
      from: `service@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
      to: emailId,
      subject: `Service Booking Confirmation - ${referenceNumber}`,
      react: ServiceConfirmationEmail({
        name,
        emailId,
        contactNumber,
        model,
        registrationNumber,
        serviceType,
        pickupRequired,
        bookingDate: new Date(bookingDate),
        bookingTime,
        referenceNumber,
      }),
    };

    const emailResponse = await resend.emails.send(emailData);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Service booking confirmed successfully",
        referenceNumber,
        emailSent: !!emailResponse?.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing service booking:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to book service",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
