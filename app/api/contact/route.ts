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
    if (!name || !email || !phoneNumber || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 }
      );
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

    // Send confirmation email to the user
    const emailData = {
      from: `contact@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
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

    // Send emails
    const emailResponse = await resend.emails.send(emailData);

    return NextResponse.json(
      {
        success: true,
        message: "Contact form submitted successfully",
        requestId,
        emailSent: !!emailResponse?.data?.id,
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
