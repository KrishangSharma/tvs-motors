import { TestMessage } from "@/lib/whatsapp";
import { NextResponse } from "next/server";

export const POST = async () => {
  const res = await TestMessage({
    to: "919599951032",
  });

  console.log("Response from WhatsApp API:", res);
  return new NextResponse(JSON.stringify(res));
};
