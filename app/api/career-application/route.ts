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
    const formData = await req.formData();
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const interestedProfile = formData.get("interestedProfile") as string;
    const coverLetter = formData.get("coverLetter") as string;
    const resume = formData.get("resume") as File;

    const applicationId = generateApplicationId();
    const applicationDate = new Date();
    const hasCoverLetter = !!coverLetter && coverLetter.trim() !== "";

    // Convert resume to base64 for email attachment
    const resumeBuffer = await resume.arrayBuffer();
    const resumeBase64 = Buffer.from(resumeBuffer).toString("base64");

    // Send confirmation email to applicant
    const applicantEmailData = {
      from: `careers@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
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

    // Send notification email to admin with resume attachment
    const adminEmailData = {
      from: `careers@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
      to: process.env.ADMIN_EMAIL!, // Make sure to set this in your environment variables
      subject: `New Job Application: ${interestedProfile}`,
      html: `
        <h2>New Job Application Received</h2>
        <p><strong>Application ID:</strong> ${applicationId}</p>
        <p><strong>Date:</strong> ${applicationDate.toLocaleString()}</p>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Position:</strong> ${interestedProfile}</p>
        ${hasCoverLetter ? `<p><strong>Cover Letter:</strong><br>${coverLetter}</p>` : ""}
      `,
      attachments: [
        {
          filename: resume.name,
          content: resumeBase64,
          contentType: resume.type,
        },
      ],
    };

    // Send both emails
    await Promise.all([
      resend.emails.send(applicantEmailData),
      resend.emails.send(adminEmailData),
    ]);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
        applicationId,
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
