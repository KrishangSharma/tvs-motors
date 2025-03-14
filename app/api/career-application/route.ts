import { CareerApplicationEmail } from "@/react-email-starter/emails/career-application";
import { resend } from "@/react-email-starter/lib/resend";
import { NextRequest, NextResponse } from "next/server";

// Generate a unique application ID
function generateApplicationId(): string {
  const randomNum = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
  return `APP-${randomNum}`;
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
      interestedProfile,
      coverLetter,
      resume, // Note: File handling is usually done differently in APIs
    } = await req.json();

    const applicationId = generateApplicationId();
    const applicationDate = new Date();
    const hasCoverLetter = !!coverLetter && coverLetter.trim() !== "";

    // Send confirmation email
    const emailData = {
      from: "careers@resend.dev",
      to: email,
      subject: `Application Received: ${interestedProfile} Position`,
      react: CareerApplicationEmail({
        fullName,
        email,
        phone,
        interestedProfile,
        applicationId,
        applicationDate,
        hasCoverLetter,
      }),
    };

    const emailResponse = await resend.emails.send(emailData);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
        applicationId,
        emailSent: !!emailResponse?.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting application:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit application",
      },
      { status: 500 }
    );
  }
}
