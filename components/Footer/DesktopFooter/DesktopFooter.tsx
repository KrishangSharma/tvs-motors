// DesktopFooter.jsx
import React from "react";
import Image from "next/image";
import DesktopFooterSections from "./DesktopFooterSections";
import DesktopContactInfo from "./DesktopContactInfo";
import SocialMediaSection from "./SocialMediaSection";
import CopyrightSection from "./CopyrightSection";
import Logo from "@/public/TVSLogo-hr.svg";

export default function DesktopFooter() {
  return (
    <div className="px-5 py-8">
      <div className="mb-8">
        <Image
          src={Logo}
          alt="TVS Logo"
          width={150}
          height={50}
          className="object-contain"
        />
      </div>

      <DesktopFooterSections />

      <DesktopContactInfo />

      <SocialMediaSection />

      <CopyrightSection />
    </div>
  );
}
