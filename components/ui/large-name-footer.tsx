"use client";
import React from "react";
import Link from "next/link";
import { Icons } from "@/components/ui/icons";
import { Phone, Mail, LifeBuoy } from "lucide-react";
import Image from "next/image";

export function Footer() {
  const desktopFooterSections = [
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

  const contactInfo = [
    { title: "CONTACT", icon: Phone, content: "18002587555" },
    { title: "EMAIL", icon: Mail, content: "customercare@tvsmotor.com" },
    {
      title: "NEED ROAD SIDE ASSISTANCE?",
      icon: LifeBuoy,
      content: 'Dial 1800-258-7111 and Press "1"',
    },
  ];

  const socialLinks = [
    {
      href: "#",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      ),
    },
    {
      href: "#",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      href: "#",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      href: "#",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
    {
      href: "#",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
        </svg>
      ),
    },
  ];

  const copyrightLinks = [
    { text: "Privacy Policy", href: "#" },
    { text: "Disclaimer", href: "#" },
    { text: "Cookie Policy", href: "#" },
  ];

  return (
    <footer className="w-full py-12 px-4 bg-customBlue">
      <div className="container mx-auto">
        {/* Branding Section */}
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 text-white">
            <Icons.logo className="icon-class w-8 " />
            <h2 className="text-xl font-bold ">TVS Motors</h2>
          </Link>
        </div>
        {/* Unified Grid: DesktopFooterSections + Contact/Social */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {desktopFooterSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-bold mb-4 text-white ">{section.title}</h3>
              <div className="space-y-2">
                {section.items.map((item, idx) => {
                  if (item.type === "text")
                    return (
                      <p key={idx} className="text-gray-100">
                        {item.content}
                      </p>
                    );
                  if (item.type === "list")
                    return (
                      <ul
                        key={idx}
                        className="list-disc pl-5 space-y-1 text-gray-200"
                      >
                        {item.items.map((listItem, listIdx) => (
                          <li key={listIdx}>{listItem}</li>
                        ))}
                      </ul>
                    );
                  if (item.type === "link")
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
                  return null;
                })}
                {section.extra &&
                  section.extra.map((extraSection, eIdx) => (
                    <div key={eIdx}>
                      <h3 className="font-bold mt-6 mb-4 text-white">
                        {extraSection.title}
                      </h3>
                      <div className="space-y-2">
                        {extraSection.items.map((item, idx) => {
                          if (item.type === "text")
                            return (
                              <p key={idx} className="text-gray-200">
                                {item.content}
                              </p>
                            );
                          if (item.type === "link")
                            return (
                              <Link
                                key={idx}
                                href={item.href}
                                className="inline-block"
                              >
                                <Image
                                  src={item.image}
                                  alt={item.alt}
                                  width={item.width}
                                  height={item.height}
                                  className="object-contain"
                                />
                              </Link>
                            );
                          return null;
                        })}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
          {/* New Grid Item: Contact Info and Social Media */}
          <div className="col-span-2 text-white">
            {/* Contact Info Card */}
            <div className="bg-[#0a2669] rounded-lg p-6 mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {contactInfo.map((contact, idx) => (
                  <div key={idx}>
                    <h4 className="font-bold mb-1">{contact.title}</h4>
                    <div className="flex items-center">
                      <contact.icon className="w-4 h-4 mr-2" />
                      <span>{contact.content}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Social Media Section */}
            <div className="text-center">
              <h4 className="font-bold mb-4">FOLLOW US</h4>
              <div className="flex justify-center space-x-4">
                {socialLinks.map((social, idx) => (
                  <Link
                    key={idx}
                    href={social.href}
                    className="bg-[#0a2669] p-2 rounded-full"
                  >
                    {social.svg}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Copyright Section */}
        <div className="mt-8 text-center text-sm text-gray-100">
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
        {/* Huge Centered Text */}
        <div className="w-full flex mt-4 items-center justify-center">
          <h1 className="text-center text-3xl md:text-5xl lg:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 select-none">
            TVS Motors
          </h1>
        </div>
      </div>
    </footer>
  );
}
