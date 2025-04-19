import { SuggestionFeedbackEmail } from "@/react-email-starter/emails/suggestion";
import { resend } from "@/react-email-starter/lib/resend";
import { NextRequest, NextResponse } from "next/server";

// Generate a unique feedback ID
function generateFeedbackId(): string {
  const randomNum = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
  const timestamp = new Date().getTime().toString().slice(-6);
  return `FDBK-${timestamp}-${randomNum.slice(0, 4)}`;
}

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const { name, email, subject, message, rating } = await req.json();

    // Validate required fields
    if (!subject || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const feedbackId = generateFeedbackId();
    const submissionDate = new Date();

    // Send confirmation email if email is provided
    let emailResponse = null;
    if (email) {
      const emailData = {
        from: `feedback@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
        to: email,
        subject: `Feedback Received: ${subject}`,
        react: SuggestionFeedbackEmail({
          name,
          email,
          subject,
          message,
          rating,
          feedbackId,
          submissionDate,
        }),
      };

      emailResponse = await resend.emails.send(emailData);
    }

    // Send internal notification to admin/team
    const internalEmailData = {
      from: `feedback@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
      to: process.env.ADMIN_EMAIL!,
      subject: `New Feedback: ${subject} (${feedbackId})`,
      react: SuggestionFeedbackEmail({
        name: name || "Anonymous",
        email: email || "Not provided",
        subject,
        message,
        rating,
        feedbackId,
        submissionDate,
      }),
    };

    const internalEmailResponse = await resend.emails.send(internalEmailData);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Feedback submitted successfully",
        feedbackId,
        emailSent: email ? !!emailResponse?.data?.id : false,
        notificationSent: !!internalEmailResponse?.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing feedback submission:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process feedback submission",
        error: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 }
    );
  }
}
