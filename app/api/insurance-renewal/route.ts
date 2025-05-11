import { InsuranceRenewalEmail } from "@/react-email-starter/emails/insurance-renewal";
import { AdminInsuranceRenewalEmail } from "@/react-email-starter/emails/admin-insurance-renewal-email";
import { resend } from "@/react-email-starter/lib/resend";
import { NextRequest, NextResponse } from "next/server";
import {
  InsuranceAdminConfirmation,
  InsuranceUserConfirmation,
} from "@/lib/whatsapp";

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
    if (!customerName || !registrationNumber) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const requestId = generateRequestId();
    const requestDate = new Date();

    const promises = [];

    if (contactNumber) {
      const formattedPhone = contactNumber.startsWith("91")
        ? contactNumber
        : `91${contactNumber}`;

      // Client WhatsApp message
      promises.push(
        InsuranceUserConfirmation({
          to: formattedPhone,
          senderName: customerName,
          senderNumber: contactNumber,
          refId: requestId,
          date: requestDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          model,
          registrationNumber,
          year: registrationYear,
          prevInsurance: previousInsuranceCompany,
        }).catch((error) => {
          console.error("Error sending WhatsApp message:", error);
        })
      );

      // Admin WhatsApp message
      promises.push(
        InsuranceAdminConfirmation({
          to: formattedPhone,
          senderName: customerName,
          senderEmail: emailId,
          senderNumber: contactNumber,
          refId: requestId,
          date: requestDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          model,
          registrationNumber,
          year: registrationYear,
          prevInsurance: previousInsuranceCompany,
        }).catch((error) => {
          console.error("Error sending WhatsApp message:", error);
        })
      );
    }

    // Admin email data
    const adminEmailData = {
      from: `insurance@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
      to: process.env.ADMIN_EMAIL!,
      subject: `New Insurance Renewal Request: ${requestId}`,
      react: AdminInsuranceRenewalEmail({
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

    // Send emails based on whether user provided an email
    if (emailId && emailId.trim() !== "") {
      const customerEmailData = {
        from: `insurance@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
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

    return NextResponse.json(
      {
        success: true,
        message: "Insurance renewal request submitted successfully",
        requestId,
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
