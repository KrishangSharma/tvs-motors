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
