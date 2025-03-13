import TestRideConfirmationEmail from "@/react-email-starter/emails/test-ride-confirmation";
import { resend } from "@/react-email-starter/lib/resend";
import { NextRequest, NextResponse } from "next/server";

// Sample vehicle and variant data for mapping IDs to names
const vehicleMap = {
  "1": "TVS Apache RR 310",
  "2": "TVS Apache RTR 200 4V",
  "3": "TVS Ronin",
  "4": "TVS Jupiter",
  "5": "TVS NTORQ",
};

const variantMap = {
  "1-1": "Standard",
  "1-2": "BTO",
  "2-1": "Single Channel ABS",
  "2-2": "Dual Channel ABS",
  "3-1": "Single Tone",
  "3-2": "Dual Tone",
  "3-3": "Triple Tone",
  "4-1": "Standard",
  "4-2": "ZX",
  "4-3": "ZX Disc",
  "4-4": "Classic",
  "5-1": "Race XP",
  "5-2": "Super Squad Edition",
  "5-3": "Standard",
};

// Sample dealer data for mapping IDs to names and addresses
const dealerMap = {
  d1: {
    name: "TVS Motors Authorized Dealer - City Center",
    address: "123 Main Street, Mumbai, Maharashtra 400001",
  },
  d2: {
    name: "TVS Motors Authorized Dealer - Highway Road",
    address: "456 Highway Road, Mumbai, Maharashtra 400002",
  },
  d3: {
    name: "TVS Motors Authorized Dealer - Main Street",
    address: "789 Main Street, Mumbai, Maharashtra 400003",
  },
};

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const { name, email, phone, vehicle, variant, dealer, pincode } =
      await req.json();

    // Generate a booking reference
    const bookingReference = `TR-${Math.floor(10000000 + Math.random() * 90000000)}`;

    // Set booking date and time (this would typically come from a scheduling system)
    const bookingDate = new Date();
    bookingDate.setDate(bookingDate.getDate() + 2); // Schedule for 2 days from now
    const bookingTime = "11:00 AM";

    // Get the vehicle, variant, and dealer details from the maps
    const vehicleName =
      vehicleMap[vehicle as keyof typeof vehicleMap] || "Unknown Vehicle";
    const variantName =
      variantMap[variant as keyof typeof variantMap] || "Unknown Variant";
    const dealerDetails = dealerMap[dealer as keyof typeof dealerMap] || {
      name: "Unknown Dealer",
      address: `Pincode: ${pincode}`,
    };

    // Send confirmation email
    const emailData = {
      from: "testride@resend.dev",
      to: email,
      subject: `Your TVS Motors Test Ride Confirmation - ${bookingReference}`,
      react: TestRideConfirmationEmail({
        name,
        email,
        phone,
        vehicleName,
        variantName,
        dealerName: dealerDetails.name,
        dealerAddress: dealerDetails.address,
        bookingDate,
        bookingTime,
        bookingReference,
      }),
    };

    const emailResponse = await resend.emails.send(emailData);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Test ride booked successfully",
        bookingReference,
        emailSent: !!emailResponse?.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error booking test ride:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to book test ride",
      },
      { status: 500 }
    );
  }
}
