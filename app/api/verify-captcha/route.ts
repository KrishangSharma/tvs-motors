import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { captcha } = await req.json();
  console.log(captcha);

  try {
    const res = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${captcha}`,
      { method: "POST" }
    );
    const captchaValidation = await res.json();
    if (!captchaValidation.success) {
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
