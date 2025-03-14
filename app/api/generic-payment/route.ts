import { PaymentConfirmationEmail } from "@/react-email-starter/emails/payment-confirmation";
import { resend } from "@/react-email-starter/lib/resend";
import { NextRequest, NextResponse } from "next/server";

// Generate a unique transaction ID
function generateTransactionId(): string {
  const randomNum = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
  return `TXN-${randomNum}`;
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
      serviceDescription,
      amount,
      additionalInfo,
    } = await req.json();

    const transactionId = generateTransactionId();
    const paymentDate = new Date();

    // Send confirmation email
    const emailData = {
      from: "payments@resend.dev",
      to: email,
      subject: `Payment Confirmation: ₹${parseFloat(amount).toLocaleString("en-IN")} - ${transactionId}`,
      react: PaymentConfirmationEmail({
        fullName,
        email,
        phone,
        serviceDescription,
        amount: parseFloat(amount),
        additionalInfo,
        transactionId,
        paymentDate,
      }),
    };

    const emailResponse = await resend.emails.send(emailData);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Payment processed successfully",
        transactionId,
        emailSent: !!emailResponse?.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process payment",
      },
      { status: 500 }
    );
  }
}
