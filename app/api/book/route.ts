import { NextResponse } from "next/server";
import { Resend } from "resend";
import { BookVehicle } from "@/react-email-starter/emails/book-vehicle";
import { AdminVehicleBookingEmail } from "@/react-email-starter/emails/amdin-book-vehicle";
import {
  AdminVehicleBookingConfirmation,
  UserVehicleBookingConfirmation,
} from "@/lib/whatsapp";

const resend = new Resend(process.env.RESEND_API_KEY);

function generateBookingReference(): string {
  // Generate a random 5-digit number
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `BK-${randomNum}`;
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const promises = [];

    // Validate required fields
    const requiredFields = [
      "fullName",
      "mobileNumber",
      "dealership",
      "vehicle",
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Whatsapp Message
    if (data.mobileNumber) {
      // Format phone number to international format if needed
      const formattedPhone = data.mobileNumber.startsWith("91")
        ? data.mobileNumber
        : `91${data.mobileNumber}`;

      // Client Confiirmation msg
      promises.push(
        UserVehicleBookingConfirmation({
          to: formattedPhone,
          fullName: data.fullName,
          vehicleModel: data.vehicle.model,
          color: data.vehicle.color,
          variant: data.vehicle.variant,
        }).catch((error) => {
          console.error("Error sending WhatsApp message:", error);
        })
      );
    }

    //  Admin Message
    promises.push(
      AdminVehicleBookingConfirmation({
        to: process.env.WHATSAPP_ADMIN_PHONE_NUMBER!,
        fullName: data.fullName,
        vehicleModel: data.vehicle.model,
        color: data.vehicle.color,
        variant: data.vehicle.variant,
      }).catch((error) => {
        console.error("Error sending WhatsApp message:", error);
      })
    );

    const bookingReference = generateBookingReference();

    // Admin Email
    const adminEmailData = {
      from: `bookings@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
      to: process.env.ADMIN_EMAIL!,
      subject: "Confirmation for Vehicle Booking",
      react: AdminVehicleBookingEmail({
        fullName: data.fullName,
        emailId: data.emailId,
        mobileNumber: data.mobileNumber,
        dealership: data.dealership,
        vehicleModel: data.vehicle.model,
        variant: data.vehicle.variant,
        color: data.vehicle.color,
        bookingReference,
      }),
    };

    // User Email
    if (data.emailId && data.emailId.trim() !== "") {
      const customerEmailData = {
        from: `bookings@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
        to: [data.emailId],
        subject: "Confirmation for Vehicle Booking",
        react: BookVehicle({
          fullName: data.fullName,
          emailId: data.emailId,
          mobileNumber: data.mobileNumber,
          dealership: data.dealership,
          vehicleModel: data.vehicle.model,
          variant: data.vehicle.variant,
          color: data.vehicle.color,
          bookingReference,
        }),
      };
      promises.push(
        resend.emails.send(customerEmailData),
        resend.emails.send(adminEmailData)
      );
    } else {
      promises.push(resend.emails.send(adminEmailData));
    }

    await Promise.all(promises);

    return NextResponse.json(
      { message: "Booking submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Booking submission error:", error);
    return NextResponse.json(
      { message: "Failed to submit booking" },
      { status: 500 }
    );
  }
}
