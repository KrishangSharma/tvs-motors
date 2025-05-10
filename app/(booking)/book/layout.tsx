import "../../globals.css";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const quicksand = Quicksand({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Book A Vehicle | TVS Sabharwal",
  description: "Site description goes here...",
};

export default function BookingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.className} antialiased`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
