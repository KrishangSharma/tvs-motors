import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FooterItems } from "@/types";

const desktopFooterSections: FooterItems[] = [
  {
    title: "MOTORCYCLES",
    items: [
      { type: "text", content: "TVS Apache" },
      {
        type: "list",
        items: [
          "RTR 310",
          "RR 310",
          "RTR 200 4V",
          "RTR 180",
          "RTR 160 4V",
          "RTR 160",
        ],
      },
      { type: "text", content: "Ronin" },
      { type: "text", content: "Raider" },
      { type: "text", content: "Radeon" },
      { type: "text", content: "Sport" },
      { type: "text", content: "Star City+" },
    ],
  },
  {
    title: "ELECTRIC SCOOTERS",
    items: [
      { type: "text", content: "TVS iQube" },
      {
        type: "list",
        items: [
          "iQube 2.2 kWh",
          "iQube 3.4 kWh",
          "iQube S 3.4 kWh",
          "iQube ST 3.4 kWh",
          "iQube ST 5.1 kWh",
        ],
      },
      { type: "text", content: "TVS X" },
    ],
    extra: [
      {
        title: "SCOOTERS",
        items: [
          { type: "text", content: "Jupiter 110" },
          { type: "text", content: "Jupiter 125" },
          { type: "text", content: "Ntorq" },
          { type: "text", content: "Zest 110" },
        ],
      },
    ],
  },
  {
    title: "MOPEDS",
    items: [{ type: "text", content: "XL 100" }],
    extra: [
      {
        title: "THREE WHEELERS",
        items: [
          { type: "text", content: "TVS King Deluxe" },
          { type: "text", content: "TVS King Duramax" },
          { type: "text", content: "TVS King Duramax Plus" },
          { type: "text", content: "TVS King EV Max" },
          { type: "text", content: "TVS King Kargo" },
        ],
      },
      {
        title: "RIDES & EVENTS",
        items: [
          { type: "text", content: "TVS Racing" },
          { type: "text", content: "TVS Motosoul" },
          { type: "text", content: "TVS Storm the Sands 2024" },
        ],
      },
    ],
  },
  {
    title: "INVESTORS",
    items: [
      { type: "text", content: "Overview" },
      { type: "text", content: "Financial Reports" },
      { type: "text", content: "Communication" },
    ],
    extra: [
      {
        title: "TVS DEALER LOCATOR",
        items: [
          { type: "text", content: "Two Wheeler Dealers" },
          { type: "text", content: "Three Wheeler Dealers" },
          { type: "text", content: "Super Premium Dealers" },
          { type: "text", content: "Electric Scooter Dealers" },
          { type: "text", content: "AMD & AD Dealers" },
          { type: "text", content: "iQube Dealers" },
        ],
      },
    ],
  },
  {
    title: "ABOUT US",
    items: [
      { type: "text", content: "Overview" },
      { type: "text", content: "Company Vision" },
      { type: "text", content: "Achievements" },
      { type: "text", content: "Careers" },
      { type: "text", content: "Contact Us" },
    ],
    extra: [
      {
        title: "NEWS & MEDIA",
        items: [
          { type: "text", content: "News" },
          { type: "text", content: "Press Release" },
          { type: "text", content: "Blog" },
        ],
      },
    ],
  },
  {
    title: "SHOP",
    items: [
      { type: "text", content: "Accessories" },
      { type: "text", content: "Merchandise" },
      { type: "text", content: "TVS Genuine Parts" },
      { type: "text", content: "TRU4 Oil" },
    ],
    extra: [
      {
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
      },
    ],
  },
];

export default function MobileAccordionSections() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {desktopFooterSections.map((section, index) => (
        <AccordionItem
          key={index}
          value={section.title.toLowerCase().replace(/\s+/g, "-")}
        >
          <AccordionTrigger className="px-4 py-3 border-t border-[#1a3c8d] font-bold">
            {section.title}
          </AccordionTrigger>
          <AccordionContent className="px-4 py-2">
            <div className="space-y-2">
              {section.items.map((item, idx) => {
                if (item.type === "text") {
                  return <p key={idx}>{item.content}</p>;
                } else if (item.type === "list" && "items" in item) {
                  return (
                    <ul key={idx} className="list-disc pl-5 space-y-1">
                      {item.items.map((listItem: string, listIdx: number) => (
                        <li key={listIdx}>{listItem}</li>
                      ))}
                    </ul>
                  );
                } else if (item.type === "link") {
                  return (
                    <Link key={idx} href={item.href} className="inline-block">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                        className="object-contain"
                      />
                    </Link>
                  );
                }
                return null;
              })}
              {section.extra &&
                section.extra.map((extraSection, eIdx) => (
                  <div key={eIdx}>
                    {/* <h3 className="font-bold mt-6 mb-4">
                      {extraSection.title}
                    </h3> */}
                    <div className="space-y-2">
                      {extraSection.items.map((item, idx) => (
                        <p key={idx}>{item.content}</p>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
