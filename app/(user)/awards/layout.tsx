import type React from "react";
import { AwardsHero } from "@/components/AwardsHero";

export default function AwardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AwardsHero />
      {children}
    </>
  );
}
