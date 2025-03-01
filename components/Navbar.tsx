"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/TVSLogo-hr.svg";
import { Menu, PanelLeftOpen } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import ProductMenu from "./ProductMenu";

export default function Navbar() {
  const path = usePathname();


  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 170);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile Navigation Links
  const MobileNav = () => {
    return (
      <>
        {/* Side Menu */}
        <Sheet >
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden w-8 h-8"
              aria-label="Toggle Menu"
            >
              <PanelLeftOpen className="w-8 h-8" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[400px] overflow-y-auto sm:w-[300px]">

            <SheetClose asChild>
              <div className="flex flex-col space-y-4 mt-8">
                <div className="space-y-4 py-4">
                  <div className="px-2 py-1">
                    <h2 className="text-lg font-semibold">Products</h2>
                    <ProductMenu />
                  </div>
                  <div className="px-2 py-1">
                    <Link
                      href="/services"
                      className="block font-medium text-customBlue"

                    >
                      Services
                    </Link>
                  </div>
                  <div className="px-2 py-1">
                    <h2 className="mb-2 font-medium text-customBlue">Shop</h2>
                    <div className="space-y-2">
                      {/* Add your shop links here */}
                      <p className="text-sm">Shop content goes here</p>
                    </div>
                  </div>
                  <div className="px-2 py-1">
                    <h2 className="mb-2 font-medium text-customBlue">Company</h2>
                    <div className="space-y-2">
                      {/* Add your company links here */}
                      <p className="text-sm">Company content goes here</p>
                    </div>
                  </div>
                  {/* Secondary Links */}
                  <div className="w-full flex flex-col gap-4 items-start justify-start mt-5 px-2">
                    {/* <Link
                    href="/buy-vehicle"
                    className="flex flex-col items-start space-y-1"
                  >
                    <span className="text-gray-400">Buy Vehicle</span>
                  </Link> */}
                    <Link
                      href="/test-ride"
                      className="px-4 py-2 text-sm font-medium text-white bg-customBlue rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Book A Test Ride
                    </Link>
                    {/* <Link
                    href="/dealers"
                    className="flex flex-col items-start space-y-1"
                  >
                    <span className="text-gray-400">Dealers</span>
                  </Link> */}
                  </div>
                </div>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </>
    );
  };

  return (
    <>
      {/* Add a placeholder div to prevent layout shift */}
      <div className={`h-16 w-full ${path.startsWith("/studio") ? "hidden" : "block"}`} />

      {/* Desktop Navigation */}
      <nav
        className={`
          w-full fixed top-0 left-0 right-0 z-50
          ${path.startsWith("/studio") ? "hidden" : "flex"}
          hidden lg:flex py-5 backdrop-blur-xl
          transition-all duration-200 ease-in-out
          ${isScrolled
            ? "bg-white/90 px-8"
            : "bg-white"}
        `}
      >
        <div className={`
          w-full mx-auto max-w-7xl flex items-center justify-between
          ${isScrolled ? "px-4" : "px-2 sm:px-4"}
        `}>
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
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-9 font-medium">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ProductMenu />
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="group font-medium inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-transparent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    href="/services"
                  >
                    Services
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-9 font-medium">
                    Shop
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px]">
                      <div className="text-sm">Shop content goes here</div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-9 font-medium">
                    Company
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px]">
                      <div className="text-sm">Company content goes here</div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
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
