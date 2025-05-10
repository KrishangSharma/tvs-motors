import { PanelLeftOpen } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import ProductMenu from "../ProductMenu";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/TVSLogo-hr.svg";
import Search from "@/components/ui/search";
import { NavigationMenu } from "@/components/ui/navigation-menu";

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
          className="w-[400px] bg-white overflow-y-auto sm:w-[350px]"
        >
          <SheetTitle>
            <SheetClose asChild>
              <Link href="/">
                <Image
                  src={Logo || "/placeholder.svg"}
                  alt="TVS Logo"
                  width={100}
                  height={40}
                  className="h-4 w-auto"
                />
              </Link>
            </SheetClose>
          </SheetTitle>

          {/* Search bar at the top of the menu */}
          <div className="mt-6 mb-4">
            <Search />
          </div>

          <NavigationMenu>
            <div className="space-y-4 py-4 w-[330px]">
              <div className="px-2 py-1">
                <h2 className="font-medium">Products</h2>
                <ProductMenu />
              </div>
              <div className="px-2 py-1">
                <SheetClose asChild>
                  <Link
                    href="/our-services"
                    className="block font-medium text-customBlue"
                  >
                    Services
                  </Link>
                </SheetClose>
              </div>
              <div className="px-2 py-1">
                <SheetClose asChild>
                  <Link
                    href="/awards"
                    className="block font-medium text-customBlue"
                  >
                    Awards
                  </Link>
                </SheetClose>
              </div>
              <div className="px-2 py-1">
                <SheetClose asChild>
                  <Link
                    href="/company"
                    className="block font-medium text-customBlue"
                  >
                    Company
                  </Link>
                </SheetClose>
              </div>
              {/* Secondary Links */}
              <div className="px-2 py-1">
                <SheetClose asChild>
                  <Link
                    href="/book"
                    className="px-4 py-2 text-sm font-medium text-white bg-customBlue rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Book A Vehicle
                  </Link>
                </SheetClose>
              </div>
            </div>
          </NavigationMenu>
        </SheetContent>
      </Sheet>
    </>
  );
}
