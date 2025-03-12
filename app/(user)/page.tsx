"use client";

import { Hero, Stories, YourRide } from "@/components/exports";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function Home() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LclavIqAAAAAL48sDjZDsdPk-Q9pxUXSD1Q0qAc">
      <main className="w-full flex flex-col gap-5">
        <Hero />
        <Stories />
        <YourRide />
      </main>
    </GoogleReCaptchaProvider>
  );
}
