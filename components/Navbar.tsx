"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/TVSLogo-hr.svg";
import { Headphones, Menu, User } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";

export default function Navbar() {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Mobile Navigation Links
  const MobileNav = () => {
    return (
      <>
        {/* Side Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="lg"
              className="lg:hidden hover:bg-transparent"
              aria-label="Toggle Menu"
            >
              <Menu className="h-10 w-10" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:w-[500px]">
            <div className="flex flex-col space-y-4 mt-8">
              <div className="space-y-4 py-4">
                <div className="px-2 py-1">
                  <h2 className="mb-2 text-lg font-semibold">Products</h2>
                  <div className="space-y-2">
                    {/* Add your product links here */}
                    <p className="text-sm">Product content goes here</p>
                  </div>
                </div>
                <div className="px-2 py-1">
                  <Link
                    href="/services"
                    className="block text-lg font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    Services
                  </Link>
                </div>
                <div className="px-2 py-1">
                  <h2 className="mb-2 text-lg font-semibold">Shop</h2>
                  <div className="space-y-2">
                    {/* Add your shop links here */}
                    <p className="text-sm">Shop content goes here</p>
                  </div>
                </div>
                <div className="px-2 py-1">
                  <h2 className="mb-2 text-lg font-semibold">Company</h2>
                  <div className="space-y-2">
                    {/* Add your company links here */}
                    <p className="text-sm">Company content goes here</p>
                  </div>
                </div>
                {/* Secondary Links */}
                <div className="w-full flex flex-col gap-4 items-start justify-start mt-5 px-2">
                  <Link
                    href="/buy-vehicle"
                    className="flex flex-col items-start space-y-1"
                  >
                    <span className="text-gray-400">Buy Vehicle</span>
                  </Link>
                  <Link
                    href="/test-ride"
                    className="flex flex-col items-start space-y-1"
                  >
                    <span className="text-gray-400">Test Ride</span>
                  </Link>
                  <Link
                    href="/dealers"
                    className="flex flex-col items-start space-y-1"
                  >
                    <span className="text-gray-400">Dealers</span>
                  </Link>
                  <div className="flex items-center gap-5">
                    <Link
                      href="/contact-us"
                      className="flex items-center gap-2"
                    >
                      <Headphones className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-400">Contact</span>
                    </Link>
                    <Link href="/login" className="flex items-center gap-2">
                      <User className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-400">Login</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </>
    );
  };

  return (
    <nav
      className={`container py-5 mx-auto bg-white/30 backdrop-blur-xl px-2 sm:px-4 sm:mt-4 sm:rounded-xl ${path.startsWith("/studio") ? "hidden" : "flex"} items-center justify-between font-roboto border`}
    >
      <div className="lg:hidden flex items-center flex-row-reverse justify-between w-full">
        <MobileNav />
        <Link href="/" className="mr-4">
          <Image
            src={Logo}
            alt="TVS Logo"
            width={100}
            height={40}
            className="h-4 w-auto"
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
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
                <div className="grid gap-3 p-6 min-w-[500px]">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-sm">Product content goes here</div>
                  </div>
                </div>
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

      {/* Desktop Right Side Links */}
      <div className="hidden lg:flex items-center space-x-4">
        <nav className="flex items-center space-x-2">
          <Link
            href="/buy-vehicle"
            className="text-sm font-medium text-customBlue transition-colors hover:text-primary"
          >
            Buy Vehicle
          </Link>
          <span className="text-muted-foreground">|</span>
          <Link
            href="/test-ride"
            className="text-sm font-medium text-customBlue transition-colors hover:text-primary"
          >
            Test Ride
          </Link>
          <span className="text-muted-foreground">|</span>
          <Link
            href="/dealers"
            className="text-sm font-medium text-customBlue transition-colors hover:text-primary"
          >
            Dealers
          </Link>
        </nav>
        <Select defaultValue="india">
          <SelectTrigger className="w-[110px] h-9 border-0">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="india">
              <div className="flex items-center">
                <Image
                  src="https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IN.svg"
                  width={18}
                  height={18}
                  alt="India Flag"
                  className="mr-2"
                />
                India
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        <Link
          href="/contact-us"
          className="text-muted-foreground inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-primary"
        >
          <Headphones className="h-5 w-5" />
        </Link>
        <Link
          href="/login"
          className="text-muted-foreground inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-primary"
        >
          <User className="h-5 w-5" />
        </Link>
      </div>
    </nav>
  );
}
