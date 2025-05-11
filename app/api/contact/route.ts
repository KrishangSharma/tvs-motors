import {
  ContactAdminConfirmation,
  ContactUserConfirmation,
} from "@/lib/whatsapp";
import AdminContactEmail from "@/react-email-starter/emails/admin-contact-email";
import ContactEmail from "@/react-email-starter/emails/contact";
import { resend } from "@/react-email-starter/lib/resend";
import { type NextRequest, NextResponse } from "next/server";

// Generate a unique request ID
function generateRequestId(): string {
  const randomNum = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
  return `CONTACT-${randomNum}`;
}

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const { name, email, phoneNumber, message } = await req.json();

    // Validate required fields
    if (!name || !phoneNumber || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    if (email && email.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { success: false, message: "Invalid email format" },
          { status: 400 }
        );
      }
    }

    // Validate phone number (10 digits)
    if (!/^\d{10}$/.test(phoneNumber)) {
      return NextResponse.json(
        { success: false, message: "Phone number must be 10 digits" },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.length < 10) {
      return NextResponse.json(
        { success: false, message: "Message must be at least 10 characters" },
        { status: 400 }
      );
    }

    const requestId = generateRequestId();
    const requestDate = new Date();

    const promises = [];

    if (phoneNumber) {
      // Format phone number to international format if needed
      const formattedPhone = phoneNumber.startsWith("91")
        ? phoneNumber
        : `91${phoneNumber}`;

      // Client Confiirmation msg
      promises.push(
        ContactUserConfirmation({
          to: formattedPhone,
          senderName: name,
        }).catch((error) => {
          console.error("Error sending WhatsApp message:", error);
        })
      );

      // Admin WhatsApp message
      promises.push(
        ContactAdminConfirmation({
          to: process.env.WHATSAPP_ADMIN_PHONE_NUMBER!,
          senderName: name,
          senderEmail: email || "Not provided",
          senderNumber: phoneNumber,
          message: message.substring(0, 100),
        }).catch((error) => {
          console.error("Error sending WhatsApp message:", error);
        })
      );
    }

    // Admin email data
    const adminEmailData = {
      from: `customercare@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
      to: process.env.ADMIN_EMAIL!,
      subject: "New support query received!",
      react: AdminContactEmail({
        name,
        email,
        phoneNumber,
        message,
        requestId,
        requestDate,
      }),
    };

    // Send emails based on whether user provided an email
    if (email && email.trim() !== "") {
      const customerEmailData = {
        from: `customercare@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
        to: email,
        subject: "Thank You for Contacting Us",
        react: ContactEmail({
          name,
          email,
          phoneNumber,
          message,
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

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully",
        requestId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit contact form",
      },
      { status: 500 }
    );
  }
}
