import { PanelLeftOpen } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
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
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden w-8 h-8"
            aria-label="Toggle Menu"
          >
            <PanelLeftOpen className="w-8 h-8" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[400px] overflow-y-auto sm:w-[350px]"
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
          <div className="flex flex-col space-y-4 mt-8">
            <div className="space-y-4 py-4">
              <div className="px-2 py-1 ">
                <h2 className="font-medium">Products</h2>
                <ProductMenu />
              </div>
              <SheetClose asChild>
                <div className="px-2 py-1">
                  <Link
                    href="/services"
                    className="block font-medium text-customBlue"
                  >
                    Services
                  </Link>
                </div>
              </SheetClose>
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
                <SheetClose asChild>
                  <Link
                    href="/test-ride"
                    className="px-4 py-2 text-sm font-medium text-white bg-customBlue rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Book A Test Ride
                  </Link>
                </SheetClose>
                {/* <Link
                    href="/dealers"
                    className="flex flex-col items-start space-y-1"
                  >
                    <span className="text-gray-400">Dealers</span>
                  </Link> */}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
