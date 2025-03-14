import { LoanApplicationEmail } from "@/react-email-starter/emails/loan-application";
import { resend } from "@/react-email-starter/lib/resend";
import { NextRequest, NextResponse } from "next/server";

// Generate a unique application ID
function generateApplicationId(): string {
  const randomNum = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
  return `LOAN-${randomNum}`;
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
      dateOfBirth,
      employmentStatus,
      annualIncome,
      loanAmount,
      loanTenure,
      residentialAddress,
      additionalInfo,
    } = await req.json();

    const applicationId = generateApplicationId();
    const applicationDate = new Date();

    // Send confirmation email
    const emailData = {
      from: "loans@resend.dev",
      to: email,
      subject: `Vehicle Loan Application Confirmation: ${applicationId}`,
      react: LoanApplicationEmail({
        fullName,
        email,
        phone,
        dateOfBirth: new Date(dateOfBirth),
        employmentStatus,
        annualIncome: parseFloat(annualIncome),
        loanAmount: parseFloat(loanAmount),
        loanTenure: parseInt(loanTenure),
        residentialAddress,
        additionalInfo,
        applicationId,
        applicationDate,
      }),
    };

    const emailResponse = await resend.emails.send(emailData);

    // Store application data (you would normally save this to a database)
    // This is just a placeholder for where you would add your database storage logic
    const applicationData = {
      applicationId,
      applicationDate,
      fullName,
      email,
      phone,
      dateOfBirth,
      employmentStatus,
      annualIncome,
      loanAmount,
      loanTenure,
      residentialAddress,
      additionalInfo,
      status: "Under Review",
    };

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Loan application submitted successfully",
        applicationId,
        emailSent: !!emailResponse?.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing loan application:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit loan application",
      },
      { status: 500 }
    );
  }
}
