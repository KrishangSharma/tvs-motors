"use client";

import { useEffect, useState } from "react";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";
import type { NavVehicleItem } from "@/types";
import { ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SheetClose } from "./ui/sheet";

export default function ProductMenu() {
  const [vehicles, setVehicles] = useState<NavVehicleItem[]>([]);
  const [activeType, setActiveType] = useState<string>("Motorcycle");
  const [loading, setLoading] = useState(false);

  // Vehicle categories
  const vehicleTypes = [
    { id: "Motorcycle", label: "Motorcycles" },
    { id: "Scooter", label: "Scooters" },
    { id: "Moped", label: "Mopeds" },
  ];

  useEffect(() => {
    const fetchVehicles = async () => {
      if (!activeType) return;

      setLoading(true);
      try {
        // GROQ Query to get vehicles based on selected type
        const query = groq`
          *[_type == "vehicle" && type == "${activeType}"] {
            _id,
            slug,
            model,
            "image": images[0].asset->url
          }
        `;

        const data = await client.fetch(query);
        setVehicles(data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [activeType]);

  // Toggle category visibility
  const toggleCategory = (type: string) => {
    if (activeType === type) {
      setActiveType("");
    } else {
      setActiveType(type);
    }
  };

  return (
    <>
      {/* Sidebar w preview pane */}
      <div className="hidden lg:flex h-full w-full">
        {/* Sidebar for Categories */}
        <div className="w-1/4 min-w-[250px] bg-gray-100 p-5 flex flex-col gap-2">
          {vehicleTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveType(type.id)}
              className={`flex justify-between items-center py-2 px-3 rounded-md hover:bg-gray-200 transition-colors ${
                activeType === type.id ? "bg-gray-300" : ""
              }`}
            >
              {type.label}
              <ChevronRight className="h-5 w-5" />
            </button>
          ))}
          <Link
            href="/product/vehicles"
            className="py-2 px-3 hover:bg-gray-200 rounded-md transition-colors mt-4"
          >
            Explore All Vehicles
          </Link>
        </div>
        {/* Vehicle Preview Pane */}
        <div className="min-w-[600px] p-5">
          {loading ? (
            <p className="text-gray-500">Loading vehicles...</p>
          ) : vehicles.length > 0 ? (
            <div className="grid grid-cols-4 gap-5">
              {vehicles.map((vehicle) => (
                <Link
                  key={vehicle._id}
                  href={`/product/${vehicle.slug.current}`}
                  className="flex flex-col items-center gap-2 hover:bg-gray-200/50 p-3 rounded-md transition-colors"
                >
                  <div className="w-[120px] h-[70px] relative overflow-hidden flex items-center justify-center">
                    <Image
                      src={vehicle.image || "/placeholder.svg"}
                      width={120}
                      height={70}
                      quality={100}
                      alt={vehicle.model}
                      className="w-auto h-full object-contain"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-center">
                    {vehicle.model}
                  </h3>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No Vehicles Available</p>
          )}
        </div>
      </div>
      {/* Mobile Menu with dropdown list */}
      {/* <Sheet> */}
      <div className="flex flex-col gap-3 p-2 lg:hidden ">
        {/* Vehicle type categories */}
        <Accordion
          type="single"
          collapsible
          value={activeType}
          onValueChange={(value) => setActiveType(value)}
        >
          {vehicleTypes.map((type) => (
            <AccordionItem
              value={type.id}
              className="border-none w-full"
              key={type.id}
            >
              <AccordionTrigger
                className="font-normal hover:no-underline hover:bg-gray-100 p-3 rounded-lg"
                onClick={() => toggleCategory(type.id)}
              >
                {type.label}
              </AccordionTrigger>
              <AccordionContent className="ml-5 pl-4 py-2 border-l ">
                {activeType === type.id && (
                  <div className="flex flex-col gap-4">
                    {loading ? (
                      <p className="text-gray-500">Loading vehicles...</p>
                    ) : vehicles.length > 0 ? (
                      vehicles.map((vehicle) => (
                        <SheetClose asChild key={vehicle._id}>
                          <Link
                            href={`/product/${vehicle.slug.current}`}
                            className="flex gap-3 items-center hover:bg-gray-200/50 p-2 rounded-md transition-colors"
                          >
                            <div className="w-[100px] h-[60px] relative flex-shrink-0 overflow-hidden flex items-center justify-center">
                              <Image
                                src={vehicle.image || "/placeholder.svg"}
                                width={100}
                                height={50}
                                alt={vehicle.model}
                                className="w-auto h-full object-contain"
                              />
                            </div>
                            <h3 className="text-base font-medium">
                              {vehicle.model}
                            </h3>
                          </Link>
                        </SheetClose>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">
                        No vehicles available
                      </p>
                    )}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* All Vehicles link */}
        <SheetClose asChild>
          <Link
            href="/product/vehicles"
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            All Vehicles
          </Link>
        </SheetClose>
      </div>
      {/* </Sheet> */}
    </>
  );
}
