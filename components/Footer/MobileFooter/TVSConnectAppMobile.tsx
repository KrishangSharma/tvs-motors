import React from "react";
import Link from "next/link";
import Image from "next/image";

const shopExtraData = {
  title: "TVS CONNECT APP",
  items: [
    {
      type: "link",
      href: "#",
      image:
        "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png",
      alt: "Get it on Google Play",
      width: 140,
      height: 42,
    },
    {
      type: "link",
      href: "#",
      image:
        "https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg",
      alt: "Download on the App Store",
      width: 140,
      height: 42,
    },
  ],
};

export default function TVSConnectAppMobile() {
  return (
    <div className="px-4 py-6 text-center border-t border-[#1a3c8d]">
      <h3 className="font-bold mb-4">{shopExtraData.title}</h3>
      <div className="flex justify-center space-x-2">
        {shopExtraData.items.map((item, idx) => (
          <Link key={idx} href={item.href} className="inline-block">
            <Image
              src={item.image}
              alt={item.alt}
              width={item.width}
              height={item.height}
              className="object-contain"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
