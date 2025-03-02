import React from "react";
import Link from "next/link";

const copyrightLinks = [
  { text: "Privacy Policy", href: "#" },
  { text: "Disclaimer", href: "#" },
  { text: "Cookie Policy", href: "#" },
];

export default function CopyrightSection() {
  return (
    <div className="mt-8 text-center text-sm">
      <p>
        © TVS Motor Company. All Rights Reserved |{" "}
        {copyrightLinks.map((link, idx) => (
          <React.Fragment key={idx}>
            <Link href={link.href} className="hover:underline">
              {link.text}
            </Link>
            {idx < copyrightLinks.length - 1 && " | "}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
}
