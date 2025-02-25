"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/TVSLogo-hr.svg";
import { Headphones, User } from "lucide-react";

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

export default function Navbar() {
  return (
    <nav className="container py-5 mx-auto z-50 bg-white flex items-center justify-between font-roboto">
      <Link href="/" className="mr-4">
        <Image
          src={Logo}
          alt="TVS Logo"
          width={100}
          height={40}
          className="h-6 w-auto"
        />
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="h-9 font-medium">
              Products
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-6 w-[400px]">
                <div className="grid grid-cols-2 gap-4">
                  {/* Add product content here */}
                  <div className="text-sm">Product content goes here</div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className="group font-medium inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
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
                {/* Add shop content here */}
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
                {/* Add company content here */}
                <div className="text-sm">Company content goes here</div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="ml-auto flex items-center space-x-4">
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
            {/* Add more countries as needed */}
          </SelectContent>
        </Select>
        <Link
          href="/contact-us"
          className="text-muted-foreground inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-primary"
        >
          <Headphones className="h-5 w-5" />
        </Link>
        <Link
          href="/login  "
          className="text-muted-foreground inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-primary"
        >
          <User className="h-5 w-5" />
        </Link>
      </div>
    </nav>
  );
}
