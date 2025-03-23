import { ServiceBookingConfirmationEmail } from "@/react-email-starter/emails/online-service";
import { resend } from "@/react-email-starter/lib/resend";
import { NextRequest, NextResponse } from "next/server";

// Generate a unique booking ID
function generateBookingId(): string {
  const randomNum = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
  return `SRV-${randomNum}`;
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
      name,
      contactNumber,
      emailId,
      model,
      registrationNumber,
      serviceType,
      pickupRequired,
      bookingDate,
      bookingTime,
    } = await req.json();

    // Validate required fields
    if (
      !name ||
      !contactNumber ||
      !emailId ||
      !model ||
      !registrationNumber ||
      !serviceType ||
      !pickupRequired ||
      !bookingDate ||
      !bookingTime
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const bookingId = generateBookingId();

    // Send confirmation email
    const emailData = {
      from: `service@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
      to: emailId,
      subject: `Service Booking Confirmation: ${bookingId}`,
      react: ServiceBookingConfirmationEmail({
        name,
        emailId,
        contactNumber,
        model,
        registrationNumber,
        serviceType,
        pickupRequired,
        bookingDate: new Date(bookingDate),
        bookingTime,
        bookingId,
      }),
    };

    const emailResponse = await resend.emails.send(emailData);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Service booking confirmed successfully",
        bookingId,
        bookingDetails: {
          name,
          contactNumber,
          emailId,
          model,
          registrationNumber,
          serviceType,
          pickupRequired,
          bookingDate,
          bookingTime,
        },
        emailSent: !!emailResponse?.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing service booking:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process service booking",
        error: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 }
    );
  }
}
