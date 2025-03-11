import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Image from "next/image";
import { groq } from "next-sanity";
import { Sheet, SheetClose } from "../ui/sheet";
import { useEffect, useState } from "react";
import type { NavVehicleItem } from "@/types";
import { client } from "@/sanity/lib/client";

export default function ProdMenuMobile() {
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState<NavVehicleItem[]>([]);
  const [activeType, setActiveType] = useState<string>("motorcycle");

  // Vehicle categories
  const vehicleTypes = [
    { id: "motorcycle", label: "Motorcycles" },
    { id: "scooter", label: "Scooters" },
    { id: "moped", label: "Mopeds" },
  ];

  useEffect(() => {
    const fetchVehicles = async () => {
      if (!activeType) return;

      setLoading(true);
      try {
        // GROQ Query to get vehicles based on selected type
        const query = groq`
          *[_type == "${activeType}"] {
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
                          href={`/product/${activeType}/${vehicle.slug.current}`}
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
      <SheetClose asChild className="lg:hidden">
        <Link
          href="/product/vehicles"
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
        >
          All Vehicles
        </Link>
      </SheetClose>
    </div>
  );
}
