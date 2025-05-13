import { LoanApplicationEmail } from "@/react-email-starter/emails/loan-application";
import { AdminLoanApplicationEmail } from "@/react-email-starter/emails/admin-loan-application-email";
import { resend } from "@/react-email-starter/lib/resend";
import { NextRequest, NextResponse } from "next/server";
import { LoanAdminConfirmation, LoanUserConfirmation } from "@/lib/whatsapp";

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
      documentType,
      documentNumber,
    } = await req.json();

    const applicationId = generateApplicationId();
    const applicationDate = new Date();

    const promises = [];

    if (phone) {
      const formattedPhone = phone.startsWith(91) ? phone : `91${phone}`;

      // User WhatsApp message
      promises.push(
        LoanUserConfirmation({
          to: formattedPhone,
          senderName: fullName,
        }).catch((error) => {
          console.error("Error sending WhatsApp message:", error);
        })
      );

      // Admin WhatsApp message
      promises.push(
        LoanAdminConfirmation({
          to: process.env.WHATSAPP_ADMIN_PHONE_NUMBER!,
          refId: applicationId,
          date: applicationDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          loanAmt: loanAmount.toString(),
          tenure: loanTenure,
          senderName: fullName,
          senderEmail: email,
          senderNumber: phone,
          dob: new Date(dateOfBirth).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          employmentStatus,
          address: residentialAddress,
          annualIncome: parseFloat(annualIncome).toString(),
        }).catch((error) => {
          console.error("Error sending WhatsApp message:", error);
        })
      );
    }

    // Admin email data
    const adminEmailData = {
      from: `loans@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
      to: process.env.ADMIN_EMAIL!,
      subject: `New Vehicle Loan Application: ${applicationId}`,
      react: AdminLoanApplicationEmail({
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
        documentType,
        documentNumber,
      }),
    };

    // Send emails based on whether user provided an email
    if (email && email.trim() !== "") {
      const customerEmailData = {
        from: `loans@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}`,
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
          documentType,
          documentNumber,
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
        message: "Loan application submitted successfully",
        applicationId,
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
