import React from "react";
import Image from "next/image";
import Logo from "@/public/TVSLogo-hr.svg";
import MobileAccordionSections from "./MobileAccordionSections";
import TVSConnectAppMobile from "./TVSConnectAppMobile";
import MobileContactInfo from "./MobileContactInfo";
import MobileSocialMedia from "./MobileSocialMedia";
import MobileCopyright from "./MobileCopyright";

export default function MobileFooter() {
  return (
    <div>
      <div className="p-4">
        <Image
          src={Logo}
          alt="TVS Logo"
          width={120}
          height={40}
          className="object-contain mb-6"
        />
      </div>

      <MobileAccordionSections />

      <TVSConnectAppMobile />

      <MobileContactInfo />

      <MobileSocialMedia />

      <MobileCopyright />
    </div>
  );
}
