import VehicleExchangeConfirmationEmail from "@/react-email-starter/emails/vehicle-exchange";
import AdminExchangeEmail from "@/react-email-starter/emails/admin-exchange";
import { resend } from "@/react-email-starter/lib/resend";
import { NextRequest, NextResponse } from "next/server";
import {
  ExchangeAdminConfirmation,
  ExchangeUserConfirmation,
} from "@/lib/whatsapp";

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

    const promises = [];

    if (phone) {
      const formattedPhone = phone.startsWith("91") ? phone : `91${phone}`;

      // Client WhatsApp message
      promises.push(
        ExchangeUserConfirmation({
          to: formattedPhone,
          senderName: fullName,
          refId: exchangeReference,
          date: requestDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          model: currentVehicleModel,
          registrationNumber: currentVehicleRegistration,
          year: currentVehicleYear,
          desiredVehicle: desiredVehicleDetails,
        }).catch((error) => {
          console.error("Error sending WhatsApp message:", error);
        })
      );
    }

    // Admin WhatsApp message
    promises.push(
      ExchangeAdminConfirmation({
        to: process.env.WHATSAPP_ADMIN_PHONE_NUMBER!,
        refId: exchangeReference,
        date: requestDate.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        senderName: fullName,
        senderEmail: email,
        senderNumber: phone,
        model: currentVehicleModel,
        year: currentVehicleYear,
        registrationNumber: currentVehicleRegistration,
        desiredVehicle: desiredVehicleDetails,
      }).catch((error) => {
        console.error("Error sending WhatsApp message:", error);
      })
    );

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

    // Execute all promises in parallel
    await Promise.all(promises);

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
