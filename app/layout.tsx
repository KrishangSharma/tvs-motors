import type { Metadata } from "next";
import { Roboto, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const robotoSans = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TVS Motors | Delhi",
  description: "Site description goes here...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoSans.variable} ${nunitoSans.variable} antialiased overflow-x-hidden`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
