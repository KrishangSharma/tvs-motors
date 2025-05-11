import { CareerApplicationEmail } from "@/react-email-starter/emails/career-application";
import { AdminCareerApplicationEmail } from "@/react-email-starter/emails/admin-career-application";
import { resend } from "@/react-email-starter/lib/resend";
import { NextRequest, NextResponse } from "next/server";
import {
  CareerAdminConfirmation,
  CareerUserConfirmation,
} from "@/lib/whatsapp";

// Add the profile names mapping
const profileNames: { [key: string]: string } = {
  frontend: "Frontend Developer",
  backend: "Backend Developer",
  fullstack: "Full Stack Developer",
  "ui-ux": "UI/UX Designer",
  product: "Product Manager",
  qa: "QA Engineer",
  devops: "DevOps Engineer",
  other: "Other Position",
};

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

    // Get the display name for the profile
    const displayProfile = profileNames[interestedProfile] || interestedProfile;

    const applicationId = generateApplicationId();
    const applicationDate = new Date();
    const hasCoverLetter = !!coverLetter && coverLetter.trim() !== "";

    // Convert resume to base64 for email attachment
    const resumeBuffer = await resume.arrayBuffer();
    const resumeBase64 = Buffer.from(resumeBuffer).toString("base64");

    // Empty array of promises to be populated later
    const promises = [];

    if (phone) {
      // Format phone number to international format if needed
      const formattedPhone = phone.startsWith("91") ? phone : `91${phone}`;

      // Client Confiirmation msg
      promises.push(
        CareerUserConfirmation({
          to: formattedPhone,
          applicantName: fullName,
          jobProfile: displayProfile,
          requestID: applicationId,
        }).catch((error) => {
          console.error("Error sending WhatsApp message:", error);
        })
      );
    }
    // Admin WhatsApp message
    promises.push(
      CareerAdminConfirmation({
        to: process.env.WHATSAPP_ADMIN_PHONE_NUMBER!,
        applicantName: fullName,
        contactNumber: phone,
        applicantEmail: email,
        jobProfile: displayProfile,
        requestID: applicationId,
      }).catch((error) => {
        console.error("Error sending WhatsApp message:", error);
      })
    );

    // Prepare admin email data
    const adminEmailData = {
      from: `hr@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
      to: process.env.ADMIN_EMAIL!,
      subject: `New Job Application: ${displayProfile}`,
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
        subject: `Application Received: ${displayProfile} Position`,
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

      promises.push(
        resend.emails.send(applicantEmailData),
        resend.emails.send(adminEmailData)
      );
    } else {
      promises.push(resend.emails.send(adminEmailData));
    }

    // Execute all promises in parallel
    await Promise.all(promises);

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
