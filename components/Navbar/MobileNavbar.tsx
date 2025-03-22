import { PanelLeftOpen } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import ProductMenu from "../ProductMenu";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/TVSLogo-hr.svg";

export default function MobileNav() {
  return (
    <>
      {/* Side Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <PanelLeftOpen className="w-6 h-6 cursor-pointer " />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[400px] overflow-y-auto sm:w-[350px] flex flex-col gap-5"
        >
          <SheetTitle>
            <SheetClose asChild>
              <Link href="/">
                <Image
                  src={Logo}
                  alt="TVS Logo"
                  width={100}
                  height={40}
                  className="h-4 w-auto"
                />
              </Link>
            </SheetClose>
          </SheetTitle>
          <NavigationMenu>
            <NavigationMenuList className="flex-col items-start">
              <div className="space-y-4 w-full min-h-screen">
                <div className="px-2 py-1">
                  <h2 className="font-medium">Products</h2>
                  <ProductMenu />
                </div>
                <NavigationMenuItem className="px-2 py-1">
                  <SheetClose asChild>
                    <NavigationMenuLink
                      asChild
                      className="block font-medium text-customBlue"
                    >
                      <Link href="/our-services">Services</Link>
                    </NavigationMenuLink>
                  </SheetClose>
                </NavigationMenuItem>
                <NavigationMenuItem className="px-2 py-1">
                  <SheetClose asChild>
                    <NavigationMenuLink
                      asChild
                      className="block font-medium text-customBlue"
                    >
                      <Link href="/awards">Awards</Link>
                    </NavigationMenuLink>
                  </SheetClose>
                </NavigationMenuItem>
                <NavigationMenuItem className="px-2 py-1">
                  <SheetClose asChild>
                    <NavigationMenuLink
                      asChild
                      className="block font-medium text-customBlue"
                    >
                      <Link href="/company">Company</Link>
                    </NavigationMenuLink>
                  </SheetClose>
                </NavigationMenuItem>
                <div className="w-full flex flex-col gap-4 items-start justify-start mt-5 px-2">
                  <SheetClose asChild>
                    <Link
                      href="/test-ride"
                      className="px-4 py-2 text-sm font-medium text-white bg-customBlue rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Book A Test Ride
                    </Link>
                  </SheetClose>
                </div>
              </div>
            </NavigationMenuList>
          </NavigationMenu>
        </SheetContent>
      </Sheet>
    </>
  );
}
