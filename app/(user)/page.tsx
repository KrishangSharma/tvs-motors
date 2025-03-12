"use client";

import { Hero, Stories, YourRide } from "@/components/exports";
// import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function Home() {
  return (
    <main className="w-full flex flex-col gap-5">
      <Hero />
      <Stories />
      <YourRide />
    </main>
  );
}
