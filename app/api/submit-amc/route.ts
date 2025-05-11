import { AMCConfirmationEmail } from "@/react-email-starter/emails/get-amc";
import { AdminAMCEmail } from "@/react-email-starter/emails/admin-amc-email";
import { resend } from "@/react-email-starter/lib/resend";
import { NextRequest, NextResponse } from "next/server";
import { AMCAdminConfirmation, AMCUserConfirmation } from "@/lib/whatsapp";

// Generate a unique order reference number
function generateOrderReference(): string {
  const randomNum = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
  return `AMC-${randomNum}`;
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
      ownerName,
      email,
      phone,
      vehicleMake,
      registrationNumber,
      amcPackage,
      startDate,
      additionalComments,
    } = await req.json();

    const orderReference = generateOrderReference();

    const promises = [];

    if (phone) {
      const formattedPhone = phone.startsWith("91") ? phone : `91${phone}`;

      // Client WhatsApp message
      const parsedStartDate = new Date(startDate);
      const endDate = new Date(parsedStartDate);
      endDate.setFullYear(endDate.getFullYear() + 1);

      promises.push(
        AMCUserConfirmation({
          to: formattedPhone,
          senderName: ownerName,
          refId: orderReference,
          planType: amcPackage,
          startDate: parsedStartDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          endDate: endDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          model: vehicleMake,
          registrationNumber: registrationNumber,
        }).catch((error) => {
          console.error("Error sending WhatsApp message to user:", error);
        })
      );

      // Admin WhatsApp message
      promises.push(
        AMCAdminConfirmation({
          to: process.env.WHATSAPP_ADMIN_PHONE_NUMBER!,
          senderName: ownerName,
          senderEmail: email,
          senderNumber: phone,
          refId: orderReference,
          planType: amcPackage,
          startDate: parsedStartDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "n  umeric",
          }),
          endDate: endDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          model: vehicleMake,
          registrationNumber: registrationNumber,
        }).catch((error) => {
          console.error("Error sending WhatsApp message to admin:", error);
        })
      );
    }

    // Admin email data
    const adminEmailData = {
      from: `amc@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
      to: process.env.ADMIN_EMAIL!,
      subject: `New AMC Booking: ${orderReference}`,
      react: AdminAMCEmail({
        ownerName,
        email,
        phone,
        vehicleMake,
        registrationNumber,
        amcPackage,
        startDate,
        orderReference,
        additionalComments,
      }),
    };

    // Send emails based on whether user provided an email
    if (email && email.trim() !== "") {
      const customerEmailData = {
        from: `amc@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
        to: email,
        subject: `Confirmation: AMC Booking for ${vehicleMake}`,
        react: AMCConfirmationEmail({
          ownerName,
          email,
          phone,
          vehicleMake,
          registrationNumber,
          amcPackage,
          startDate,
          orderReference,
          additionalComments,
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
        message: "AMC booking submitted successfully",
        orderReference,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting AMC booking:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit AMC booking",
      },
      { status: 500 }
    );
  }
}
