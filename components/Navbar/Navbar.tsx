"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Logo from "@/public/TVSLogo-hr.svg";
import MobileNav from "./MobileNavbar";
import ProductMenu from "../ProductMenu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NavLinks } from "@/types";

// Data for nav links
const navLinks: NavLinks[] = [
  {
    id: 1,
    label: "Products",
    type: "dropdown",
    content: <ProductMenu />,
  },
  {
    id: 2,
    label: "Services",
    type: "link",
    href: "/services",
  },
  {
    id: 3,
    label: "Shop",
    type: "dropdown",
    content: (
      <div className="grid gap-3 p-6 w-[400px]">
        <div className="text-sm">Shop content goes here</div>
      </div>
    ),
  },
  {
    id: 4,
    label: "Company",
    type: "dropdown",
    content: (
      <div className="grid gap-3 p-6 w-[400px]">
        <div className="text-sm">Company content goes here</div>
      </div>
    ),
  },
];

export default function Navbar() {
  const path = usePathname();

  // Scroll management logic(state variable and useEffect)
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Add a placeholder div to prevent layout shift */}
      <div className="h-16 w-full" />
      {/* Desktop Navigation */}
      <nav
        className={`
          w-full fixed top-0 left-0 right-0 z-50
          hidden lg:flex py-5 backdrop-blur-xl
          transition-all duration-200 ease-in-out
          ${isScrolled ? "bg-white/50 px-8 container mx-auto rounded-xl transition-all duration-200 ease-in-out mt-5" : "bg-white"}
        `}
        role="navigation"
      >
        <div
          className={`
          w-full mx-auto max-w-7xl flex items-center justify-between
          ${isScrolled ? "px-4" : "px-2 sm:px-4"}
        `}
        >
          <div className="hidden lg:flex items-center">
            <Link href="/" className="mr-4">
              <Image
                src={Logo}
                alt="TVS Logo"
                width={100}
                height={40}
                className="h-4 w-auto"
              />
            </Link>
            {/* Use navLinks array to map over and render navigation links */}
            <NavigationMenu>
              <NavigationMenuList>
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.id}>
                    {link.type === "dropdown" ? (
                      <>
                        <NavigationMenuTrigger className="h-9 font-medium">
                          {link.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          {link.content}
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink
                        className="group font-medium inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-transparent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                        href={link.href}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <nav className="flex items-center space-x-2">
              {/* <Link
              href="/buy-vehicle"
              className="text-sm font-medium text-customBlue transition-colors hover:text-primary"
            >
              Buy Vehicle
            </Link>
            <span className="text-muted-foreground">|</span> */}
              <Link
                href="/test-ride"
                className="px-4 py-2 text-sm font-medium text-white bg-customBlue rounded-md hover:bg-blue-600 transition-colors"
              >
                Book A Test Ride
              </Link>
              {/* <span className="text-muted-foreground">|</span> */}
              {/* <Link
              href="/dealers"
              className="text-sm font-medium text-customBlue transition-colors hover:text-primary"
            >
              Dealers
            </Link> */}
            </nav>
          </div>
        </div>
      </nav>

      {/* Mobile Nav - update positioning to match desktop */}
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50
          w-full py-5 bg-white/30 backdrop-blur-xl
          ${path.startsWith("/studio") ? "hidden" : "flex"}
          items-center justify-between lg:hidden
          flex-row-reverse px-4
        `}
      >
        <MobileNav />
        <Link href="/">
          <Image
            src={Logo}
            alt="TVS Logo"
            width={100}
            height={40}
            className="h-4 w-auto"
          />
        </Link>
      </nav>
    </>
  );
}
