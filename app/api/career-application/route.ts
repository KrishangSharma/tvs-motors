import { CareerApplicationEmail } from "@/react-email-starter/emails/career-application";
import { AdminCareerApplicationEmail } from "@/react-email-starter/emails/admin-career-application";
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

    // Prepare admin email data
    const adminEmailData = {
      from: `hr@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
      to: process.env.ADMIN_EMAIL!,
      subject: `New Job Application: ${interestedProfile}`,
      react: AdminCareerApplicationEmail({
        fullName,
        email,
        phone,
        interestedProfile,
        applicationId,
        applicationDate,
        hasCoverLetter,
      }),
      attachments: [
        {
          filename: resume.name,
          content: resumeBase64,
          contentType: resume.type,
        },
      ],
    };

    // Send emails based on whether user provided an email
    if (email && email.trim() !== "") {
      const applicantEmailData = {
        from: `hr@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
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

      // Send both emails
      await Promise.all([
        resend.emails.send(applicantEmailData),
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
