import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { Footer } from "@/components/ui/large-name-footer";
import { Toaster } from "@/components/ui/sonner";
import { FloatingDockDemo } from "@/components/FloatingDock";

const quicksand = Quicksand({
  weight: ["300", "400", "500", "600", "700"],
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
      <body className={`${quicksand.className} antialiased`}>
        <Navbar />
        {children}
        <FloatingDockDemo />
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
