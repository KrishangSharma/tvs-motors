"use client";

import { useEffect, useState } from "react";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";
import type { NavVehicleItem } from "@/types";
import { ChevronRight } from "lucide-react";
import ProdMenuMobile from "./ProductMenu/ProdMenuMobile";
import { vehicleTypes } from "@/constants";

export default function ProductMenu() {
  const [vehicles, setVehicles] = useState<NavVehicleItem[]>([]);
  const [activeType, setActiveType] = useState<string>("motorcycle");
  const [loading, setLoading] = useState(false);

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
                  href={`/product/${activeType}/${vehicle.slug.current}`}
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
      <ProdMenuMobile />
    </>
  );
}
