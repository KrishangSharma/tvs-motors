// Footer.jsx
import React from "react";
import DesktopFooter from "./DesktopFooter/DesktopFooter";
import MobileFooter from "./MobileFooter/MobileFooter";

export default function Footer() {
  return (
    <footer className="bg-customBlue text-white font-nunito">
      {/* Desktop Footer */}
      <div className="hidden md:block">
        <DesktopFooter />
      </div>

      {/* Mobile Footer */}
      <div className="md:hidden">
        <MobileFooter />
      </div>
    </footer>
  );
}
