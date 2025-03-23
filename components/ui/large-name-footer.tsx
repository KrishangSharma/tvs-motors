"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Category, Vehicle } from "@/types";
import FooterLogo from "@/public/TVS-Logo_SVG_White.svg";
import { getFooterData } from "@/lib/sanity";
import { contactInfo, copyrightLinks, socialLinks } from "@/constants";
import { ChevronDown } from "lucide-react";

interface FooterItem {
  type: string;
  content?: string;
  items?: Vehicle[] | string[];
  href?: string;
  image?: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface FooterSection {
  title: string;
  items: FooterItem[];
}

export function Footer() {
  const [vehicleCategories, setVehicleCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const desktopFooterSections: FooterSection[] = [
    // Vehicle Categories (Dynamic)
    ...vehicleCategories.map((category) => ({
      title: category.name.toUpperCase(),
      items: category.subcategories.map((subcategory) => {
        // Check if this subcategory has vehicles (variants)
        const hasVariants =
          subcategory.vehicles && subcategory.vehicles.length > 0;

        if (hasVariants) {
          // For subcategories WITH variants, render as list with heading
          return {
            type: "list" as const,
            content: subcategory.name, // This will be plain text heading
            items: subcategory.vehicles, // These will be rendered as links
          };
        } else {
          // For subcategories WITHOUT variants, render as direct link
          return {
            type: "directLink" as const,
            content: subcategory.name,
            href: `/product/${subcategory.parentCategory.name.toLowerCase()}/${subcategory.slug}`,
          };
        }
      }),
    })),
    // Static Sections
    {
      title: "ABOUT US",
      items: [
        { type: "text", content: "Awarrds", href: "/achievements" },
        { type: "text", content: "Careers", href: "/careers/apply" },
        { type: "text", content: "Contact Us", href: "/contact-us" },
      ],
    },
    {
      title: "TVS CONNECT APP",
      items: [
        {
          type: "link",
          href: "https://play.google.com/store/apps/details?id=com.tvsm.connect&pcampaignid=web_share",
          image:
            "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png",
          alt: "Get it on Google Play",
          width: 140,
          height: 42,
        },
        {
          type: "link",
          href: "https://apps.apple.com/in/app/tvs-connect/id1453965748",
          image:
            "https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg",
          alt: "Download on the App Store",
          width: 140,
          height: 42,
        },
      ],
    },
  ];

  useEffect(() => {
    async function fetchFooterData() {
      const data = await getFooterData();
      if (data) {
        setVehicleCategories(data);
      }
      setIsLoading(false);
    }
    fetchFooterData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full py-12 px-4 bg-gradient-to-b from-[#0a2669] to-[#051440] animate-pulse">
        <div className="container mx-auto h-96"></div>
      </div>
    );
  }

  return (
    <footer className="w-full bg-gradient-to-b from-[#0a2669] to-[#051440] text-white">
      {/* Top wave decoration */}
      <div className="w-full overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-12 text-white fill-current"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Logo and brand section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <Link
            href="/"
            className="mb-8 md:mb-0 transition-transform hover:scale-105"
          >
            <Image
              src={FooterLogo || "/placeholder.svg"}
              alt="TVS Motors"
              width={170}
              height={120}
              className="w-32 md:w-40 lg:w-48 h-auto"
            />
          </Link>

          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((social, idx) => (
              <Link
                key={idx}
                href={social.href}
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110"
                aria-label={social.href.split("/").pop()}
              >
                {social.svg}
              </Link>
            ))}
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10">
          {/* Footer sections */}
          {desktopFooterSections.map((section, index) => (
            <div key={index} className="footer-section">
              <div
                className="flex justify-between items-center mb-4 pb-2 border-b border-white/20 cursor-pointer md:cursor-default"
                onClick={() => toggleSection(section.title)}
              >
                <h3 className="text-lg font-bold tracking-wider">
                  {section.title}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 md:hidden transition-transform duration-300 ${
                    expandedSections[section.title] ? "rotate-180" : ""
                  }`}
                />
              </div>

              <div
                className={`space-y-4 overflow-hidden transition-all duration-300 ${
                  expandedSections[section.title]
                    ? "max-h-[1000px]"
                    : "max-h-0 md:max-h-[1000px]"
                }`}
              >
                {section.items.map((item, idx) => {
                  // For subcategories WITH variants (like Apache Series)
                  if (
                    item.type === "list" &&
                    item.items &&
                    item.items.length > 0
                  ) {
                    return (
                      <div key={idx} className="space-y-3">
                        {/* Render subcategory name as plain text heading */}
                        <p className="text-gray-100 font-medium">
                          {item.content}
                        </p>
                        {/* Render variants as a bulleted list with links */}
                        <ul className="grid grid-cols-1 gap-y-1 pl-2">
                          {item.items.map((vehicle, listIdx) => {
                            if (typeof vehicle === "string") return null;

                            return (
                              <li
                                key={listIdx}
                                className="text-gray-300 text-sm"
                              >
                                <Link
                                  href={`/product/${vehicle.type.toLowerCase()}/${vehicle.slug}`}
                                  className="hover:text-white transition-colors hover:underline"
                                >
                                  {vehicle.model}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  }
                  // For subcategories WITHOUT variants (like Ronin)
                  else if (item.type === "directLink") {
                    return (
                      <Link
                        key={idx}
                        href={item.href || "#"}
                        className="block text-gray-300 text-sm hover:text-white transition-colors hover:underline mb-2"
                      >
                        {item.content}
                      </Link>
                    );
                  }
                  // For about us section links
                  else if (item.type === "text") {
                    return (
                      <Link
                        key={idx}
                        href={item.href || "#"}
                        className="block text-gray-300 text-sm hover:text-white transition-colors hover:underline mb-2"
                      >
                        {item.content}
                      </Link>
                    );
                  }
                  // For app store links
                  else if (item.type === "link") {
                    return (
                      <Link
                        key={idx}
                        href={item.href || "#"}
                        className="inline-block hover:opacity-80 transition-opacity"
                      >
                        <Image
                          src={item.image || "/placeholder.png"}
                          alt={item.alt || "Placeholder"}
                          width={item.width}
                          height={item.height}
                          className="object-contain"
                        />
                      </Link>
                    );
                  }

                  return null;
                })}
              </div>
            </div>
          ))}

          {/* Contact Info Card */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-xl">
              <h3 className="text-lg font-bold tracking-wider mb-6 text-center">
                CONTACT US
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-content-center">
                {contactInfo.map((contact, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center  text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="bg-white/10 p-3 rounded-full mb-3">
                      <contact.icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold mb-2">{contact.title}</h4>
                    <span className="text-gray-300">{contact.content}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Brand statement */}
        <div className="w-full mt-16 mb-12 overflow-hidden">
          <h1 className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white select-none tracking-tighter">
            TVS Motors
          </h1>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-6 border-t border-white/20 text-center text-sm text-gray-300">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4">
            {copyrightLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="hover:text-white transition-colors hover:underline"
              >
                {link.text}
              </Link>
            ))}
          </div>
          <p>
            © {new Date().getFullYear()} TVS Motor Company. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
