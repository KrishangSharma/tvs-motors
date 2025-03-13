import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let captcha: string | undefined;

  try {
    // Retrieve the raw text from the request
    const body = await req.json();

    // Check if the body is empty
    if (!body) {
      return NextResponse.json(
        { error: "No payload provided" },
        { status: 400 }
      );
    }

    // Ensure the captcha field exists
    if (!body.captcha) {
      return NextResponse.json(
        { error: "Captcha field is missing" },
        { status: 400 }
      );
    }

    captcha = body.captcha;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  try {
    // Verify the captcha with Google reCAPTCHA
    const res = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${captcha}`,
      { method: "POST" }
    );
    const captchaValidation = await res.json();

    if (!captchaValidation.success) {
      console.log("❌ Invalid captcha:", captchaValidation);
      return NextResponse.json({ error: "Invalid captcha" }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Captcha verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Captcha Verification Error:", error);
    return NextResponse.json(
      { error: "Failed to verify captcha" },
      { status: 500 }
    );
  }
}
