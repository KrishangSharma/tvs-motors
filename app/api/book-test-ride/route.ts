import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { TestRideConfirmationEmail } from "@/react-email-starter/emails/test-ride-confirmation";
import { AdminTestRideEmail } from "@/react-email-starter/emails/admin-test-ride";
import {
  TestRideUserConfirmation,
  TestRideAdminConfirmation,
} from "@/lib/whatsapp";

const resend = new Resend();

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const formData = await req.json();

    const { name, email, phone, vehicle, variant, bookingDate, timeSlot } =
      formData;

    // Ensure bookingDate is a valid date string before creating a Date object
    let parsedBookingDate;
    try {
      // Create date object and set hours to 0 to ignore time
      parsedBookingDate = bookingDate ? new Date(bookingDate) : new Date();
      parsedBookingDate.setHours(0, 0, 0, 0);

      // Validate that the parsed date is valid
      if (isNaN(parsedBookingDate.getTime())) {
        throw new Error("Invalid date format");
      }
    } catch (dateError) {
      console.error("Error parsing date:", dateError, bookingDate);
      return NextResponse.json(
        {
          success: false,
          message: "Invalid booking date format",
        },
        { status: 400 }
      );
    }

    // Generate a booking reference
    const bookingReference = `TR-${Math.floor(10000000 + Math.random() * 90000000)}`;

    // Map the timeSlot ID to the actual time
    const timeSlotMap = {
      morning1: "9:00 AM",
      morning2: "10:00 AM",
      morning3: "11:00 AM",
      afternoon1: "12:00 PM",
      afternoon2: "1:00 PM",
      afternoon3: "2:00 PM",
      evening1: "4:00 PM",
      evening2: "5:00 PM",
      evening3: "6:00 PM",
    };

    // Get the booking time from the timeSlot
    const bookingTime =
      timeSlotMap[timeSlot as keyof typeof timeSlotMap] || "11:00 AM";

    // Get the vehicle, variant, and dealer details from the maps
    const vehicleName = vehicle;
    const variantName = variant;

    const promises = [];

    // User WhatsApp message
    if (phone) {
      const formattedPhone = phone.startsWith("91") ? phone : `91${phone}`;

      promises.push(
        TestRideUserConfirmation({
          to: formattedPhone,
          senderName: name,
          vehicleModel: vehicleName,
          model: vehicleName,
          vehicleVariant: variantName,
          senderEmail: email,
          senderNumber: phone, // Adding the missing parameter
          date: parsedBookingDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          time: bookingTime,
          refId: bookingReference,
        }).catch((error) => {
          console.error("Error sending WhatsApp message to user:", error);
        })
      );

      // Admin WhatsApp message
      promises.push(
        TestRideAdminConfirmation({
          to: process.env.WHATSAPP_ADMIN_PHONE_NUMBER!,
          senderName: name,
          senderEmail: email,
          senderNumber: phone,
          model: vehicleName,
          vehicleModel: vehicleName,
          vehicleVariant: variantName,
          date: parsedBookingDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          time: bookingTime,
          refId: bookingReference,
        }).catch((error) => {
          console.error("Error sending WhatsApp message to admin:", error);
        })
      );
    }

    // Admin email data
    const adminEmailData = {
      from: `testride@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
      to: process.env.ADMIN_EMAIL!,
      subject: `New Test Ride Booking: ${bookingReference}`,
      react: AdminTestRideEmail({
        name,
        email,
        phone,
        vehicleName,
        variantName,
        bookingDate: parsedBookingDate,
        bookingTime,
        bookingReference,
      }),
    };

    // Send emails based on whether user provided an email
    if (email && email.trim() !== "") {
      const customerEmailData = {
        from: `testride@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
        to: email,
        subject: `Your TVS Motors Test Ride Confirmation - ${bookingReference}`,
        react: TestRideConfirmationEmail({
          name,
          email,
          phone,
          vehicleName,
          variantName,
          bookingDate: parsedBookingDate,
          bookingTime,
          bookingReference,
        }),
      };

      // Add email promises
      promises.push(
        resend.emails.send(customerEmailData),
        resend.emails.send(adminEmailData)
      );
    } else {
      // Send only admin email
      promises.push(resend.emails.send(adminEmailData));
    }

    // Execute all promises in parallel
    await Promise.all(promises);

    console.log("Emails and WhatsApp messages sent successfully");

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Test ride booked successfully",
        bookingReference,
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
