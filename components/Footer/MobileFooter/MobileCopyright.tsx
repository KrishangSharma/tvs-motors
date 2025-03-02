import React from "react";
import Link from "next/link";

const copyrightLinks = [
  { text: "Privacy Policy", href: "#" },
  { text: "Disclaimer", href: "#" },
  { text: "Cookie Policy", href: "#" },
];

export default function MobileCopyright() {
  return (
    <div className="px-4 py-4 text-center text-xs border-t border-[#1a3c8d]">
      <p>© TVS Motor Company. All Rights Reserved</p>
      <p className="mt-1">
        {copyrightLinks.map((link, idx) => (
          <React.Fragment key={idx}>
            <Link href={link.href} className="hover:underline">
              {link.text}
            </Link>{" "}
            {idx < copyrightLinks.length - 1 && "| "}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
}
